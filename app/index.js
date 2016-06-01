var express    = require('express'); 
var bodyParser = require('body-parser'); 
var app        = express();
var config     = require('../config'); 

app.use(bodyParser.json()); 

app.all('*', function(req, res){
    res.json(config); 
}); 

module.exports = app; 