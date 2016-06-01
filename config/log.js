var HOST      = require('os').hostname(); 
var LOG_LEVEL = 'debug'; 

module.exports = {
    logLevel: LOG_LEVEL, 
    output: ['console', 'papertrail'], 
    transports: {
        console: {
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: true
        },
        papertrail: {
            host: process.env.GMBOT_PT_HOST, 
            port: process.env.GMBOT_PT_PORT,
            hostname: process.GMBOT_PT_HOSTNAME || HOST,  
            program: process.GMBOT_PT_PROGRAM || 'gmbot',
            level: LOG_LEVEL
        }
    }
}; 