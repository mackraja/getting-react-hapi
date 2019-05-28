/**
 * @author {[Monty Khanna]}
 */
module.exports = {
  development: {
    use_env_variable: 'postgres://flsunstohvjtrs:810548be41f34ecf0847ebb53be4cfccbfa4e9cacea83081ff6bd6a3cadddea0@ec2-54-163-230-199.compute-1.amazonaws.com:5432/d3b3qj3j2rvm5',
    username: 'flsunstohvjtrs',
    password: '810548be41f34ecf0847ebb53be4cfccbfa4e9cacea83081ff6bd6a3cadddea0',
    database: 'd3b3qj3j2rvm5',
    host: 'ec2-54-163-230-199.compute-1.amazonaws.com',
    ssl: true,
    logging: true,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    },
    // username: 'postgres',
    // password: 'Bohemia007',
    // database: 'gettingStarted',
    // host: 'localhost',
    // dialect: 'postgres',
    // protocol: 'postgres',
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      min: 0,
      max: 20,
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
