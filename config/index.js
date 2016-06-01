require('dotenv').config({path: __dirname +'/../.env'});
var logger = require('./log'); 
var worker = require('./worker');  

module.exports = {
    app: {
        hostname: process.env.GMBOT_HOSTNAME || 'bot_public_url', 
        port: process.env.GMBOT_PORT         || 8080
    }, 
    db: {
        host    : process.env.GMBOT_DB_HOST || 'localhost',
        user    : process.env.GMBOT_DB_USER || 'your_database_user',
        password: process.env.GMBOT_DB_PSWD || 'your_database_password',
        database: process.env.GMBOT_DB_NAME || 'myapp_test'
    },
    logger: logger, 
    worker: worker,
    telegram: {
        token: process.env.GMBOT_TG_TOKEN || 'telegram_token' 
    }
}; 