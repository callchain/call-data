const redis = require('redis');
// use default local redis
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

module.exports = {


  friendlyName: 'Redis client',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    return exits.success(client);

  }


};

