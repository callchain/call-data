const TimeMap = {
    '1': 1,
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
        var type = inputs.type;
        var date = inputs.date;
        var d = (parseInt(date) % TimeMap[type]) * TimeMap[type];
        return exits.success(d);
    }
  
  
  };
  
  