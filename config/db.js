/**
 * @author {[Monty Khanna]}
 */
module.exports = {
  development: {
    username: '',
    password: '',
    database: 'gettingReact',
    host: 'localhost',
    dialect: 'mysql',
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      min: 20,
      max: 30,
      idle: 30000,
      acquire: 300000,
      idleTimeoutMillis: 300000,
    },
  },
  test: {
    username: '',
    password: '',
    database: 'gr_test',
    host: 'localhost',
    dialect: 'mysql',
  },
  staging: {
    username: '',
    password: '',
    database: 'gr_staging',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: '',
    password: '',
    database: 'gr_production',
    host: 'localhost',
    dialect: 'mysql',
  },
};
