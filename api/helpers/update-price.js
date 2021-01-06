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
    var key = sails.config.custom.price_key + pair;
    var obj = await sails.helpers.redisGet(key);
    var date = new Date();
    obj = obj ? JSON.parse(obj) : {o: price, h: price, l: price, c: price, v: 0, t: date};
    if ((typeof obj.t) === 'string') {
      obj.t = new Date(obj.t);
    }
    // next day
    if (obj.t.getDate() !== date.getDate())
    {
      obj.v = amount;
      obj.o = price;
      obj.h = price;
      obj.l = price;
    }
    else
    {
      obj.v = (Number(obj.v) + Number(amount)).toFixed(6);
      obj.h = Number(price) > Number(obj.h) ? price : obj.h;
      obj.l = Number(price) < Number(obj.l) ? price : obj.l;
    }
    obj.c = price;
    obj.t = date;

    await sails.helpers.redisSet(key, JSON.stringify(obj));

    // TODO update kline
    

    // All done.
    return exits.success();

  }


};

