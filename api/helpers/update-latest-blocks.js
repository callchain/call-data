module.exports = {


  friendlyName: 'Update latest blocks',


  description: '',


  inputs: {
    block: {
      type: 'ref',
      description: 'block',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let block = inputs.block;
    let key = sails.config.custom.blks_key;
    let blocks = await sails.helpers.redisGet(key);
    blocks = blocks ? JSON.parse(blocks) : [];
    let limit = sails.config.custom.limit;
    if (blocks.length >= limit) {
      blocks.pop();
    }
    blocks = [block].concat(blocks);
    await sails.helpers.redisSet(key, JSON.stringify(blocks));
    
    // All done.
    return exits.success();

  }


};

