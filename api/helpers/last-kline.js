const TimeMap = {
  '1': 60,
  '1D': 86400
};


module.exports = {


  friendlyName: 'Last kline',


  description: '',


  inputs: {
    pair: {
      type: 'string',
      description: '',
      required: true
    },
    type: {
      type: 'string',
      description: '',
      required: true
    },
    t: {
      type: 'number',
      description: '',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let pair = inputs.pair;
    let type = inputs.type;
    let t = inputs.t;

    t = t - TimeMap[type];
    let key = sails.config.custom.price_key + '-' + pair + '-' + type + '-' + t;
    let obj = await sails.helpers.redisGet(key);
    if (obj) return exits.success(JSON.parse(obj));

    let kline = await Kline.find({s: pair, r: type, t: t});
    if (kline.length > 0) {
      await sails.helpers.redisSet(key, JSON.stringify(kline[0]));
      return exits.success(kline[0]);
    }

    // All done.
    return exits.success({c: 0});

  }


};

