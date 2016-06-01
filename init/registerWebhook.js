#!/usr/bin/env node
var setWebhook = require('./setWebhook.js'); 
var logger     = require('../app/lib/logger'); 
var config     = require('../config'); 

var webhookUrl = ['https', config.app.hostname].join('://'); 

setWebhook(webhookUrl, function(response){
            
        var success = response.ok || false; 
        
        if( ! success ){
            logger.error('Could not set webhook', success); 
            process.exit(1); 
        }
        
        process.exit(0);
        
}); 