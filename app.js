const config = require('./config/database');
const etl = require('./etl/etl');

etl.configure(config).run()