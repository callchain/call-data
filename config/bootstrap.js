/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
const call = require('call-lib');

module.exports.bootstrap = async function(done) {

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  var api = new call.CallAPI({
    server: sails.config.custom.server
  });


  api.on('error', function(code, msg) {
    console.log('call connection error, code=' + code + ', msg=' + msg);
  });

  api.on('connected', function() {
      // store.commit('online');
      console.log('connect call server');
  });

  api.on('disconnected', function() {
      // store.commit('offline');
      console.log('server disconnect');
  });

  api.on('ledger', function(ledger) {
      console.dir(ledger);
  });

  api.on('transactions', async function(tx) {
      var hash = tx.transaction.hash;
      try {
          var info = await api.getTransaction(hash);
          console.dir(info);
      } catch (e) {
          console.error(e);
      }
  });

  api.connect().then(function() {
    return done();
  });

};
