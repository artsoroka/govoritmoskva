var express    = require('express'); 
var bodyParser = require('body-parser'); 
var app        = express();
var db         = require('./lib/db'); 
var logger     = require('./lib/logger');
var telegram   = require('./lib/telegram'); 
var template   = require('./lib/template'); 
var chatbot    = require('./chatbot'); 
var newsFeed   = require('./workers/newsWatcher'); 
var config     = require('../config'); 

var Promise    = require('bluebird'); 

app.use(bodyParser.json()); 

app.all('*', function(req, res){
    logger.info('TG webhook recieved', req.body);
    chatbot.handle(req.body); 
    res.send('ok'); 
}); 

chatbot.on('/start', function(data){
    logger.info('Dialog started', data); 
    
    template.start().then(function(message){
        
        return telegram.sendMessage({
            chatId: data.message.chat.id, 
            text  : message
        }); 
    
    }); 
    
}); 

chatbot.on('/subscribe', function(data){
    logger.info('User subscribed', data); 

    db('subscribtions')
        .insert({
            chat_id: data.message.chat.id, 
            type   : 'news', 
            action : 'subscribe', 
            ts     : data.message.date
        })
        .returning('*')
        .then(function(record){
            logger.info('new subscribtion record created with id', record); 
            return template.subscribe(); 
        })
        .then(function(message){
            return telegram.sendMessage({
                chatId: data.message.chat.id, 
                text  : message
            });
        })
        .catch(function(err){
            logger.error('While setting up a subscribtion an error occured', err); 
            return telegram.sendMessage({
                chatId: data.message.chat.id, 
                text  : 'Sorry, an error occured' 
            });
        }); 

    
}); 

chatbot.on('/unsubscribe', function(data){
    logger.info('User unsubscribed', data); 

    db('subscribtions')
        .insert({
            chat_id: data.message.chat.id, 
            type   : 'news', 
            action : 'unsubscribe', 
            ts     : data.message.date
        })
        .returning('*')
        .then(function(record){
            logger.info('user unsubscribed record', record); 
            return template.subscribe(); 
        })
        .then(function(message){
            return telegram.sendMessage({
                chatId: data.message.chat.id, 
                text  : message
            });
        })
        .catch(function(err){
            logger.error('While removing a subscribtion an error occured', err); 
            return telegram.sendMessage({
                chatId: data.message.chat.id, 
                text  : 'Sorry, an error occured' 
            });
        });
    
}); 

newsFeed.on('news', function(news){
        console.log('new message have arrived', news);
    
        db
          .raw('SELECT chat_id, action FROM (SELECT chat_id, action, ts FROM subscribtions ORDER BY ts DESC) as s GROUP BY chat_id HAVING action = "subscribe"')
          .then(function(result){
              var rows        = result[0] || []; 
              var subscribers = rows.map(function(row){
                  return row.chat_id; 
              }); 
              console.log('Starting sending messages to ', subscribers.length); 
              var timeStart = Date.now(); 
              Promise
                .map(
                  subscribers, 
                  (chatId) => {
                    return new Promise((res, rej) => {
                      telegram
                        .sendMessage({
                          chatId: chatId,  
                          text  : [news.title, news.url.replace('http://', 'https://')].join('')
                        })
                        .then(function(data){
                          res({chatId: chatId, status: 'delivered'});     
                        })
                        .catch((err) => {
                            res({chatId: chatId, status: 'failed'}); 
                        }); 
                          
                      }); 
                    }, 
                    {concurrency: 10}
                )
                .then((result) => {
                    var timeTaken = (Date.now() - timeStart) / 1000; 
                    console.log('Messages sent, time taken ', timeTaken); 
                    var sentMsgs = result.reduce((acc, msg) => {
                            acc[msg.status].push(msg.chatId); 
                            return acc; 
                        }, {delivered: [], failed: []}); 
                    if( sentMsgs.failed.length ){
                        console.log('failed to deliver messages to', sentMsgs.failed.join(',')); 
                    }
                }); 
              
          }); 
 
    }); 

module.exports = app; 