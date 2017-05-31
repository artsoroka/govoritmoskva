var Promise = require('bluebird'); 
var request = require('request'); 
var logger  = require('../logger'); 
var config  = require('../../../config'); 

var apiUrl  = 'https://api.telegram.org'; 

var Telegram = function(token){
    this.token = ['bot', token].join(''); 
}; 

Telegram.prototype.makeRequest = function(method, payload){
    var token = this.token; 
    var url   = [apiUrl, token, method].join('/'); 
    
    return new Promise(function(resolve, reject){
        
        request.post({
            url: url, 
            form: payload
        }, function(err, response, body){
            if( err ){
                logger.error('Telegram api request failed with error', err); 
                return reject(err); 
            }
            
            var data = null; 
            try {
                data = JSON.parse(body);     
            } catch(e) {
                logger.error('Telegram api response contains invalid JSON string', body); 
                return reject('Got invalid JSON response'); 
            }
            
            resolve(data); 
            
        }); 
 
    }); 
    
}; 

Telegram.prototype.sendMessage = function(data){
    return this.makeRequest('sendMessage', {
        chat_id: data.chatId, 
        text   : data.text
    }); 
}; 

module.exports = new Telegram(config.telegram.token); 