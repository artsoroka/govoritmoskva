exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('subscribtions', function(table){
            table.charset('utf8'); 
            table.collate('utf8_unicode_ci'); 

            table.increments(); 
            table.integer('chat_id').unsigned();
            table.string('type', 15); 
            table.string('action', 12); // subscribe | unsibscribe 
            table.string('first_name', 100);
            table.string('last_name', 100); 
            table.integer('ts').unsigned();
            table.timestamp("created_at").defaultTo(knex.raw('now()')); 
        })
    ]);
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users'); 
};