const updateStat = require('../api/services/updateStat');

let updating = false;

module.exports.cron = {
    updateJob: {
        schedule: '0 0/1 * * * *',
        onTick: async function() {
            if (updating) return;
            updating = true;
            await updateStat();
            updating = false;
        }
    }
}