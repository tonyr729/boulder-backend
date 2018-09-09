module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/boulder_weather',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};
