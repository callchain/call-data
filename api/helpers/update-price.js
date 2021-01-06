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
      type: 'string',
      description: 'trade price',
      required: true
    },
    amount: {
      type: 'string',
      description: 'trade amount',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var pair = inputs.pair;
    var price = inputs.price;
    var amount = inputs.amount;

    const symbol_info = sails.config.custom.symbol_info[pair];
    var multipliers = symbol_info.intraday_multipliers;
    for (var i = 0; i < multipliers.length; ++i)
    {
      var m = multipliers[i];      
      var now = Math.floor(Date.now() / 1000);
      var t = await sails.helpers.toKlineTime(m, now);

      var key = ails.config.custom.price_key + '-' + pair + '-' + m + '-' + t;
      var obj = await sails.helpers.redisGet(key);

      obj = obj ? JSON.parse(obj) : {o: price, h: price, l: price, c: price, v: 0, t: t, u: 0};
      obj.v = (Number(obj.v) + Number(amount)).toFixed(6);
      obj.u = (Number(obj.u) + Number(amount) * Number(price)).toFixed(6);
      obj.h = Number(price) > Number(obj.h) ? price : obj.h;
      obj.l = Number(price) < Number(obj.l) ? price : obj.l;
      obj.c = price;
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

