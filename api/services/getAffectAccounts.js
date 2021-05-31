const flat = require('flat');

function isValidAddr(addr) {
    if (addr[0] != 'c') return false;
    return /^c[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr);
}

module.exports = function(tx) {
    let all = {};
    let f = flat(tx);
    Object.keys(f).map(function(k, i) {
        // for value
        let a1 = '' + f[k];
        if (isValidAddr(a1)) all[a1] = 1;
        // for key
        let parts = k.split('.');
        parts.map(function(k2, i2) {
            let a2 = '' + parts[k2];
            if (isValidAddr(a2)) all[a2] = 1;
        });
    });

    return Object.keys(all);
};