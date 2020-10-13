/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    latestBlocks: function(req, res) {
        return res.json({success: true, data: {}});
    },

    latestTransactions: function(req, res) {
        return res.json({success: true, data: {}});
    },

    marketInfo: function(req, res) {
        return res.json({success: true, data: {}});
    }

};

