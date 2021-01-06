/**
 * FeedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `FeedController.config()`
   */
  config: async function (req, res) {
    return res.json(sails.config.custom.tvconfig);
  },

  /**
   * `FeedController.symbols()`
   */
  symbols: async function (req, res) {
    var symbol = req.query.symbol;
    return res.json(sails.config.custom.symbol_info[symbol]);
  },

  /**
   * `FeedController.history()`
   */
  history: async function (req, res) {
    const no_data = {s: 'no_data'};
    return res.json(no_data);
  }

};

