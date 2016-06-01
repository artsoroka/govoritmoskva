var express    = require('express'); 
var bodyParser = require('body-parser'); 
var app        = express();
var logger     = require('./lib/logger'); 
var config     = require('../config'); 

app.use(bodyParser.json()); 

app.all('*', function(req, res){
    logger.info('TG webhook recieved', req.body); 
    res.send('ok'); 
}); 

module.exports = app; 