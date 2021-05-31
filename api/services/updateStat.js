const updateBalance = require('./updateBalance');

const MAX_LIMIT = 4500;
const MIN_LEDGER = 1;

module.exports = async function() {
    let block0 = await Account.find({a: 'LATEST-BLOCK'});
    block0 = block0.length > 0 ? block0[0].b : MIN_LEDGER;

    let api = sails.api;
    let block1 = await api.getLedgerVersion();
    block1 = block0  + MAX_LIMIT < block1 ? block0 + MAX_LIMIT : block1;

    for (let h = block0; h <= block1; ++h)
    {
        let ledger;
        try {
            ledger = await api.getLedger({includeTransactions: true, ledgerVersion: h});
        } catch (e) {
            console.error('error for get ledger, ledger version=' + h + ', error=' + e);
            continue;
        }
        if (!ledger.transactionHashes) continue;

        for (let t = 0; t < ledger.transactionHashes.length; ++t)
        {
            let tx;
            try {
                tx = await api.getTransaction(ledger.transactionHashes[t]);
                console.dir(JSON.stringify(tx));
            } catch (e) {
                console.error('error for get tx, hash=' + ledger.transactionHashes[t] + ', error=' + e);
                continue;
            }
            await updateBalance(tx);
        }
    }

    if (block0 === MIN_LEDGER) {
        await Account.create({a: 'LATEST-BLOCK', b: block1});
    } else {
        await Account.update({a: 'LATEST-BLOCK'}).set({b: block1});
    }

    return block1;
};