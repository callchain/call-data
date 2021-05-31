/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  'GET /blocks/latest': 'DataController.latestBlocks',
  'GET /transactions/latest': 'DataController.latestTransactions',
  'GET /price/latest/:pair': 'DataController.latestPrice',

  'GET /tv/config': 'FeedController.config',
  'GET /tv/symbols': 'FeedController.symbols',
  'GET /tv/history': 'FeedController.history',

  // 'GET /updateStat': 'DataController.updateStat'
};
