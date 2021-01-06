module.exports = {
    datastores: {
      default: {
        adapter: 'sails-mysql',
        url: 'mysql://root:root@localhost:3306/calldatadb'
      },
    },
  
    models: {
      migrate: 'safe'
    }
  };
  