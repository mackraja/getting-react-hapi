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
    username: 'flsunstohvjtrs',
    password: '810548be41f34ecf0847ebb53be4cfccbfa4e9cacea83081ff6bd6a3cadddea0',
    database: 'd3b3qj3j2rvm5',
    host: 'ec2-54-163-230-199.compute-1.amazonaws.com',
    dialect: 'postgres',
  },
};
