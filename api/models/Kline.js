/**
 * Kline.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    s: { type: 'string', required: true }, // symbol
    r: { type: 'string', required: true }, // resolution
    t: { type: 'number', required: true }, // unix time
    o: { type: 'number', required: true }, // open
    h: { type: 'number', required: true }, // high
    l: { type: 'number', required: true }, // low
    c: { type: 'number', required: true }, // close
    v: { type: 'number', required: true }, // volume
    u: { type: 'number', required: true }  // value
  },

};

