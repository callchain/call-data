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
const BN = require('bignumber.js');

module.exports.bootstrap = async function(done) {

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  let api = new call.CallAPI({
    server: sails.config.custom.server
  });


  api.on('error', function(code, msg) {
    sails.log.error('call connection error, code=' + code + ', msg=' + msg);
  });

  api.on('connected', function() {
      sails.log.info('connect call server');
  });

  api.on('disconnected', function() {
      sails.log.warn('server disconnect');
  });

  api.on('ledger', async function(ledger) {
      await sails.helpers.updateLatestBlocks(ledger);
  });

  api.on('transactions', async function(tx) {
      let hash = tx.transaction.hash;
      try {
          let info = await api.getTransaction(hash);
          await sails.helpers.updateLatestTransactions(info);

          // update order pair price
          let orderbookChanges = info.outcome.orderbookChanges;
          for (let prop in orderbookChanges) {
            let changes = orderbookChanges[prop];
            for (let i = 0; i < changes.length; ++i)
            {
              let change = changes[i];
              if (change.status !== 'filled' && change.status !== 'partially-filled') continue;
              let pair = change.quantity.currency;
              if (change.quantity.counterparty) {
                pair += '@' + change.quantity.counterparty;
              }
              pair += '_';
              pair += change.totalPrice.currency;
              if (change.totalPrice.counterparty) {
                pair += '@' + change.totalPrice.counterparty;
              }

              let price = new BN(change.totalPrice.value).div(change.quantity.value);
              let amount = new BN(change.quantity.value);

              console.log('NEW PRICE, pair=' + pair + ", price=" + price + ", amount=" + amount);
              await sails.helpers.updatePrice(pair, price, amount);
            }
          }
      } catch (e) {
          console.error(e);
      }
  });

  api.connect().then(function() {
    return done();
  });

};
