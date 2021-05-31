const getAffectAccounts = require('./getAffectAccounts');

module.exports = async function(tx) {
    let accounts = await getAffectAccounts(tx);

    let api = sails.api;
    for (let i = 0; i < accounts.length; ++i) {
        let bal;
        let a = accounts[i];
        try {
            bal = await api.getAccountInfo(a);
        } catch (e) {
            console.error('error for get balance, address=' + a + ', error=' + e);
            continue;
        }
        let acc = await Account.find({a: a});
        if (acc.length > 0) {
            await Account.update({a: a}).set({b: bal.callBalance});
        } else {
            await Account.create({a: a, b: bal.callBalance});
        }
    }
};