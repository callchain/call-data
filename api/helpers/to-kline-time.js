const TimeMap = {
    '1': 60,
    '1D': 86400
};

module.exports = {
    friendlyName: 'To Kline Time',
    description: '',

    inputs: {
      type: {
        type: 'string',
        description: '',
        required: true
      },
      date: {
        type: 'number',
        description: '',
        required: true
      }
    },
  
    exits: {
    },

    fn: async function (inputs, exits) {
        let type = inputs.type;
        let date = inputs.date;
        let d = parseInt(parseInt(date) / TimeMap[type]) * TimeMap[type];
        return exits.success(d);
    }
};
  
  