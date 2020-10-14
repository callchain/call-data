module.exports = {


  friendlyName: 'Update latest transactions',


  description: '',


  inputs: {
    tx: {
      type: 'ref',
      description: 'transaction',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var tx = inputs.tx;
    var key = sails.config.custom.txs_key;
    var txs = await sails.helpers.redisGet(key);
    txs = txs ? JSON.parse(txs) : [];
    var limit = sails.config.custom.limit;
    if (txs.length >= limit) {
      txs.pop();
    }
    txs = [tx].concat(txs);
    await sails.helpers.redisSet(key, JSON.stringify(txs));
    
    // All done.
    return exits.success();

  }


};

