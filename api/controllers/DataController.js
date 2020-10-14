/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function(req, res) {
        return res.ok('Welcome to Callchain. Please refer to github.com/callchain/calldata for more information.');
    },
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
        var key = sails.config.custom.price_key + pair;
        var price = await sails.helpers.redisGet(key);
        price = price ? JSON.parse([price]) : {o: '0', h: '0', l: '0', c: '0', v: '0', time: new Date()};
        return res.json({success: true, data: price});
    }

};

