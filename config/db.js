/**
 * @author {[Monty Khanna]}
 */
module.exports = {
  development: {
    username: 'postgres',
    password: 'Bohemia007',
    database: 'gettingStarted',
    host: 'localhost',
    dialect: 'postgres',
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
    database: '',
    host: 'localhost',
    dialect: 'postgres',
  },
  staging: {
    username: '',
    password: '',
    database: '',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  },
};
