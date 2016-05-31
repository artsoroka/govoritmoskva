var _       = require('lodash'); 
var request = require('request'); 
var cheerio = require('cheerio'); 
var Promise = require('bluebird'); 

var openPage = function(url){
    return new Promise(function(resolve, reject){
        request.get(url, function(err, response, html){
            if(err){
                return reject('url request failed with error' + err); 
            }
            
            if(response.statusCode == 404) {
	            return reject('page not found with url ' + url); 
	        } 
            
            resolve(html);         
            
        }); 
    }); 
}; 

module.exports.openPage = openPage; 

module.exports.findNewsLinks = function(html){
    
    var $ = cheerio.load(html); 
    
    return new Promise(function(resolve, reject){
        
        var newsLinks = [];
        var links     = $('a'); 
        
        links.map(function(i, link){
            var url = link.attribs.href || '';  
	        if( url.match(/news\/\d/) )
	            newsLinks.push(url);
	      });
	    
	    if( _.isEmpty(newsLinks) ){
	        return reject('no newslinks found on the page'); 
	    }
	    
	    resolve(newsLinks); 
    }); 
}; 

module.exports.removeExisting = function(links, maxId){
    return new Promise(function(resolve, reject){
        var newEntries = links.filter(function(link){
            var newsId = _.first(link.match(/\d+/));  
            return _.toInteger(newsId) > _.toInteger(maxId); 
        }); 
        
        if( _.isEmpty(newEntries) ){
            return reject('no new entries found'); 
        } 
        
        resolve(newEntries); 
        
    }); 
}; 

var getNewsContent = function(url, html){
    var $ = cheerio.load(html); 
    
    return new Promise(function(resolve, reject){
        var title   = $('.newContent h1').text();
        var content = $('.textContent').text(); 
        
        resolve({
            id     : _.first(url.match(/\d+/)), 
            url    : url, 
            title  : title.split("\n").join('').split("\r").join(''), 
            content: content
        }); 
    }); 
}; 

module.exports.parseNewsPages = function(links){
    return new Promise(function(resolve, reject){
        
        Promise.map(links, function(url) {
            return openPage(url).then(function(html){
                return getNewsContent(url, html); 
            }); 
        }, { concurrency: 3 }).then(function(result) {
            console.log("finished fetching news pages");
            resolve(result); 
        });
        
    }); 
}; 