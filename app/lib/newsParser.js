var _      = require('lodash');  
var db     = require('./db'); 
var parser = require('./parser');  

var baseUrl = 'http://govoritmoskva.ru'; 

module.exports = function(){
    
    return parser
        .openPage(baseUrl) 
        .then(function(html){
            return parser.findNewsLinks(html); 
        })
        .then(function(links){
            
            var urls = _.uniq(links); 
            
            return db('news')
                .max('origin_id as maxId')
                .then(function(result){
                    var maxId = _.first(result).maxId || 0; 
                    return parser.removeExisting(urls, maxId);         
                }); 
        })
        .then(function(newLinks){
            
            var links = newLinks.map(function(link){
                return [baseUrl, link].join(''); 
            }); 
            
            return parser.parseNewsPages(links); 
        })
        .then(function(entries){
            console.log('length', entries.length); 
    
            var batch = entries.map(function(entry){
                return {
                    origin_id : entry.id, 
                    origin_url: entry.url, 
                    title     : entry.title, 
                    content   : entry.content
                }; 
            }); 
            
            return db.batchInsert('news', batch, 30)
                .returning('id')
                .then(function(ids){
                    console.log('new record ids', ids); 
                })
                .then(function(){
                    return entries; 
                }); 
        }); 

}; 