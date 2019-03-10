const {onibus} = require('../db/models');
const {CronJob} = require('cron');


module.exports.configure = function configure(config){
    this.config = config;
    this.run = run;
    return this;
}


run = () => {
    const job = new CronJob ('* * * * * *',() => {
        onibus.findByPk(1).then((busao) => console.log(busao.dataValues));
    })
    job.start();
}