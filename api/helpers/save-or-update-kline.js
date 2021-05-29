const Kline = require("../models/Kline");

module.exports = {


    friendlyName: 'Save Or Update Kline',
  
  
    description: '',
  
    inputs: {
      pair: {
        type: 'string',
        description: 'pair',
        required: true
      },
      m: {
        type: 'string',
        description: 'm',
        required: true
      },
      t: {
        type: 'number',
        description: 't',
        required: true
      },
      obj: {
        type: 'ref',
        description: 'kline obj',
        required: true
      }
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
      var s = inputs.pair;
      var r = inputs.m;
      var t = inputs.t;
      var obj = inputs.obj;

      console.dir(sails.models.kline);
      var kline = await Kline.findOne({s: s, r: r, t: t});
      console.dir(kline);
      if (kline)
      {
        await Kline.update({s: s, r: r, t: t}).set({o: obj.o, h: obj.h, l: obj.l, c: obj.c, v: obj.v, u: obj.u})
      }
      else
      {
        await Kline.create({s: s, r: r, t: t, o: obj.o, h: obj.h, l: obj.l, c: obj.c, v: obj.v, u: obj.u});
      }
      
      // All done.
      return exits.success();
  
    }
  
  
  };
  
  