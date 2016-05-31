require('dotenv').config({path: __dirname +'/../.env'});

module.exports = {
    app: {
        port: 8080
    }, 
    db: {
        host    : process.env.GMBOT_DB_HOST || 'localhost',
        user    : process.env.GMBOT_DB_USER || 'your_database_user',
        password: process.env.GMBOT_DB_PSWD || 'your_database_password',
        database: process.env.GMBOT_DB_NAME || 'myapp_test'
    }
}; 