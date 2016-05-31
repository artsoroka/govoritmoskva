var newsFeed = require('./workers/newsWatcher'); 

newsFeed
    .on('news', function(news){
        console.log('new message have arrived', news); 
    }); 