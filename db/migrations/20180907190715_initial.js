
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('weather', function (table) {
      table.increments('id');
      table.integer('year').unsigned(); 
      table.integer('mon').unsigned();
      table.integer('day').unsigned();
      table.integer('tmax').unsigned();
      table.integer('tmin').unsigned();
      table.integer('precip').unsigned();
      table.integer('snow').unsigned();
      table.integer('snowcover').unsigned();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('weather'),
  ]);
};
