var winston    = require('winston'); 
var Papertrail = require('winston-papertrail').Papertrail;
var config     = require('../../config').logger; 

var transports = config.output.reduce(function(conf, transport){
   
    switch (transport) {
   
        case 'console':
            var consoleTransport = new (winston.transports.Console)(config.transports.console);  
            conf.push(consoleTransport); 
            break;
   
        case 'papertrail':
            var ptTransport = new Papertrail(config.transports.papertrail);
            conf.push(ptTransport); 
            break;
   
        default:
            break; 
   
    }
    
    return conf; 
    
}, []); 

module.exports = new winston.Logger({
    level: config.logLevel, 
    transports: transports
});