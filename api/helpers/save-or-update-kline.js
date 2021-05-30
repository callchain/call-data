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
      let s = inputs.pair;
      let r = inputs.m;
      let t = inputs.t;
      let obj = inputs.obj;

      let kline = await Kline.find({s: s, r: r, t: t});
      if (kline.length >= 1)
      {
        await Kline.update({s: s, r: r, t: t}).set(obj)
      }
      else
      {
        obj.s = s;
        obj.r = r;
        obj.t = t;
        await Kline.create(obj);
      }
      
      // All done.
      return exits.success();
  
    }
  
  
  };
  
  