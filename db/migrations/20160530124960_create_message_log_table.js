exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('message_log', function(table){
            table.charset('utf8'); 
            table.collate('utf8_unicode_ci'); 

            table.increments(); 
            table.integer('update_id').unsigned();
            table.integer('message_id').unsigned();
            table.integer('tg_user_id').unsigned();
            table.integer('chat_id').unsigned();
            table.text('text'); 
            table.integer('ts').unsigned();
            table.timestamp("created_at").defaultTo(knex.raw('now()')); 
        })
    ]);
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users'); 
};