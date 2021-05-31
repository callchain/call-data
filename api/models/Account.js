/**
 * Account.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

/**
 * FOR A=LATEST_BLOCK, b is latest block number
 * 
 */

module.exports = {

    attributes: {
      a: { type: 'string', required: true }, // address
      b: { type: 'number', required: true }, // balance
    },
  
};
  
  