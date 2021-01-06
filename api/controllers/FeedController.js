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
    const symbol = req.query.symbol;
    const from = req.query.from;
    const to = req.query.to;
    const resolution = req.query.resolution;
    const no_data = {s: 'no_data'};

    var symbol_info = sails.config.custom.symbol_info[symbol];
    if (!symbol_info || symbol_info.intraday_multipliers.indexOf(resolution) === -1)
    {
      return res.json(no_data);
    }

    var records = await Kline.find({s: symbol, r: resolution, t: {'>=': from, '<': to}});
    if (records.length === 0)
    {
      return res.json(no_data);
    }

    var result = {s: 'ok', t: [], c: [], o: [], h: [], l: [], v: []};
    for (var i = 0; i < records.length; ++i)
    {
      var item = records[i];
      result.t.push(item.t);
      result.c.push(item.c);
      result.o.push(item.o);
      result.h.push(item.h);
      result.l.push(item.l);
      result.v.push(item.v);
    }
    
    return res.json(result);
  }

};

