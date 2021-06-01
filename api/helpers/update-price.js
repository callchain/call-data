const BN = require('bignumber.js');
const ZERO = new BN(0);

module.exports = {


  friendlyName: 'Update price',


  description: '',


  inputs: {
    pair: {
      type: 'string',
      description: 'trade pair',
      required: true
    },
    price: {
      type: 'ref',
      description: 'trade price',
      required: true
    },
    amount: {
      type: 'ref',
      description: 'trade amount',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let pair = inputs.pair;
    let price = inputs.price;
    let amount = inputs.amount;

    const symbol_info = sails.config.custom.symbol_info[pair];
    if (!symbol_info) return;

    let multipliers = symbol_info.intraday_multipliers;
    for (let i = 0; i < multipliers.length; ++i)
    {
      let m = multipliers[i];
      let now = parseInt(Date.now() / 1000);
      let t = await sails.helpers.toKlineTime(m, now);
      let lk = await sails.helpers.lastKline(pair, m, t);

      let key = sails.config.custom.price_key + '-' + pair + '-' + m + '-' + t;
      let obj = await sails.helpers.redisGet(key);

      let pn = price.toFixed(6);
      // use last kline close price as open price for this kline
      obj = obj ? JSON.parse(obj) : {o: lk.c !== 0 ? lk.c : pn, h: pn, l: pn, c: pn, v: '0', t: t, u: '0'};

      obj.v = amount.plus(obj.v).toFixed(6);
      obj.u = amount.times(price).plus(obj.u).toFixed(6);
      obj.h = price.isGreaterThan(obj.h) ? price.toFixed(6) : obj.h;
      obj.l = price.isLessThan(obj.l) ? price.toFixed(6) : obj.l;
      obj.c = price.toFixed(6);
      obj.t = t;

      // update cache
      await sails.helpers.redisSet(key, JSON.stringify(obj));
      // update kline db
      await sails.helpers.saveOrUpdateKline(pair, m, t, obj);
    }

    // All done.
    return exits.success();

  }

};

