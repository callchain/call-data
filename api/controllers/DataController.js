/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    latestBlocks: async function(req, res) {
        let key = sails.config.custom.blks_key;
        let blocks = await sails.helpers.redisGet(key);
        blocks = blocks ? blocks : '[]';
        return res.json({success: true, data: JSON.parse(blocks)});
    },

    latestTransactions: async function(req, res) {
        let key = sails.config.custom.txs_key;
        let txs = await sails.helpers.redisGet(key);
        txs = txs ? txs : '[]';
        return res.json({success: true, data: JSON.parse(txs)});
    },

    latestPrice: async function(req, res) {
        let pair = req.params.pair;
        let now = parseInt(Date.now() / 1000);
        let t = parseInt(now / 86400) * 86400;
        let key = sails.config.custom.price_key + '-' + pair + '-1D-' + t;
        let price = await sails.helpers.redisGet(key);
        if (price) {
            return res.json({success: true, data: JSON.parse([price])});
        }
        let kline = await Kline.find({s: pair, r: '1D', t: t});
        if (kline.length >= 1) {
            let k = kline[0];
            price = {o: k.o, h: k.h, l: k.l, c: k.c, v: k.v, u: k.u, time: now};
            await sails.helpers.redisSet(key, JSON.stringify(price));
            return res.json({success: true, data: price});
        }

        return res.json({success: true, data: {o: '0', h: '0', l: '0', c: '0', v: '0', u: '0', time: now}});
    },

    richest: async function(req, res) {
        let q = req.query;
        let offset = q.offset ? (Number(q.offset) ? Number(q.offset) : 0) : 0;
        let limit = q.limit ? (Number(q.limit) > 100 ? 100 : (Number(q.limit) ? Number(q.limit) : 100)) : 100;

        let accounts = await Account.find({
            where: {a: {'!=': 'LATEST-BLOCK'}},
            skip: limit * offset,
            limit: limit,
            sort: 'b DESC'
        });
        return res.json(accounts);
    }

};

