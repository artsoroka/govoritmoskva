var db = require('./app/lib/db'); 

db
  .raw('SELECT chat_id, action FROM (SELECT chat_id, action, ts FROM subscribtions ORDER BY ts DESC) as s GROUP BY chat_id HAVING action = "subscribe"')
  .then(function(result){
      var rows        = result[0] || []; 
      var subscribers = rows.map(function(row){
          return row.chat_id; 
      }); 
      
      console.log(subscribers); 
  }); 