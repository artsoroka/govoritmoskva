exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('news', function(table){
            table.charset('utf8'); 
            table.collate('utf8_unicode_ci'); 

            table.increments(); 
            table.integer('origin_id').unsigned();
            table.string('origin_url', 100);
            table.string('title', 150); 
            table.text('content'); 
            table.timestamp("created_at").defaultTo(knex.raw('now()')); 
            table.timestamp("updated_at"); 
        })
    ]);
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users'); 
};