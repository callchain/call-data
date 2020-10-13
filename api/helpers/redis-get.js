module.exports = {


  friendlyName: 'Redis get',


  description: '',


  inputs: {
    key: {
      type: 'string',
      example: 'latestBlocks',
      description: '',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var key = inputs.key + sails.config.custom.prefix;
    var client = await sails.helpers.redisClient();
    client.get(key, function(err, ret) {
      if (err) sails.log.error(err);
      return exits.success(err ? null: ret);
    });
  }


};

