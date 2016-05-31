var schedule   = require('node-schedule');
var newsParser = require('../lib/newsParser'); 
var Emitter    = require('events'); 
var emitter    = new Emitter(); 
var config     = require('../../config').worker; 

var j = schedule.scheduleJob(config.interval, function(){
  
  newsParser()
    .then(function(data){
    
      data.map(function(news){
        emitter.emit('news', news); 
      }); 

    })
    .catch(function(err){
        console.log('newsParser error', err); 
    });  
      
});

module.exports = emitter; 