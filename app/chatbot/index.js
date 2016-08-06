var util         = require('util');
var EventEmitter = require('events');
var logger       = require('../lib/logger'); 

function ChatBot() {
    EventEmitter.call(this);
}

util.inherits(ChatBot, EventEmitter);

var commands = [
    '/start', 
    '/subscribe',
    '/unsubscribe'
]; 


ChatBot.prototype.handle = function(data) {
    var msg  = data.message || {}; 
    var text = msg.text     || null; 
    var self = this; 
    
    if( text ){
        
        commands.map(function(command){
            if( text.match(command)){
                self.emit(command, data); 
            }
        });     
    }
};  

module.exports = new ChatBot(); 