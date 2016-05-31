var config = require('../config'); 

module.exports = {
    client: 'mysql',
    connection: config.db,
    migrations: {
      tableName: 'migrations'
    }
};