var ejs     = require('ejs'); 
var Promise = require('bluebird'); 

var templatesDir = __dirname + '/../templates'; 

module.exports.start = function(){
    return new Promise(function(resolve,reject){
        ejs.renderFile(templatesDir + '/start.ejs', function(err, str){
            if( err ){
                return reject(err); 
            }
            
            resolve(str); 
            
        }); 
    }); 
}; 

module.exports.subscribe = function(){
    return new Promise(function(resolve,reject){
        ejs.renderFile(templatesDir + '/subscribe.ejs', function(err, str){
            if( err ){
                return reject(err); 
            }
            
            resolve(str); 
            
        }); 
    }); 
}; 

module.exports.unsubscribe = function(){
    return new Promise(function(resolve,reject){
        ejs.renderFile(templatesDir + '/unsubscribe.ejs', function(err, str){
            if( err ){
                return reject(err); 
            }
            
            resolve(str); 
            
        }); 
    }); 
}; 