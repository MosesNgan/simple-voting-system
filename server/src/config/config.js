module.exports = {
  development: {
    username: 'admin',
    password: 'password',
    database: 'simple_voting_system_development',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'admin',
    password: 'password',
    database: 'simple_voting_system_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,

  }
};


