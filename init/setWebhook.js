var request = require('request'); 
var logger  = require('../app/lib/logger'); 
var config  = require('../config'); 

var apiUrl  = 'https://api.telegram.org'; 
var method  = 'setWebhook'; 

module.exports = function(webhookUrl, callback){
    
    request.post({
        url: [apiUrl, ['bot', config.telegram.token].join(''), method].join('/'), 
        form: {
            url: webhookUrl
        }
    }, function(err, response, body){
        if( err ){
            logger.error('Could not make an API call', err); 
            process.exit(1); 
        }
        
        logger.info('Setting webhook to ' + ['"','"'].join(webhookUrl));
        logger.info('TG setWebhook response', body); 
        
        var status  = JSON.parse(body); 
        
        callback(status); 
        
    });
}; 