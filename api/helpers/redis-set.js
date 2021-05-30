module.exports = {


  friendlyName: 'Redis set',


  description: '',


  inputs: {
    key: {
      type: 'string',
      example: 'latestBlocks',
      description: '',
      required: true
    },
    value: {
      type: 'string',
      example: '',
      description: '',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let key = inputs.key + sails.config.custom.prefix;
    let client = await sails.helpers.redisClient();
    let value = inputs.value;
    client.set(key, value, function(err, ret) {
      if (err) sails.log.error(err);
      return exits.success(err ? false: true);
    });

  }


};

