/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    latestBlocks: async function(req, res) {
        var key = sails.config.custom.blks_key;
        var blocks = await sails.helpers.redisGet(key);
        blocks = blocks ? blocks : '[]';
        return res.json({success: true, data: JSON.parse(blocks)});
    },

    latestTransactions: async function(req, res) {
        var key = sails.config.custom.txs_key;
        var txs = await sails.helpers.redisGet(key);
        txs = txs ? txs : '[]';
        return res.json({success: true, data: JSON.parse(txs)});
    },

    latestPrice: async function(req, res) {
        var pair = req.params.pair;
        var now = Math.floor(Date.now() / 1000);
        var t = (now % 86400) * 86400;
        var key = sails.config.custom.price_key + '-' + pair + '-1D-' + t;
        var price = await sails.helpers.redisGet(key);
        price = price ? JSON.parse([price]) : {o: '0', h: '0', l: '0', c: '0', v: '0', u: '0', time: now};
        return res.json({success: true, data: price});
    }

};

