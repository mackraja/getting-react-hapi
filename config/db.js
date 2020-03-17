/**
 * @author {[Monty Khanna]}
 */
module.exports = {
  development: {
    username: 'postgres',
    password: 'Bohemia00(',
    database: 'gettingStarted',
    host: 'localhost',
    dialect: 'postgres',
    protocol: 'postgres',
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
    username: 'xgndhuvlvhdxcv',
    password: '7384ca9daba26472cc3c2f44def7c5d445d11e0748ae52fa74008b8e3d52a96f',
    database: 'de47auhf72j7sr',
    host: 'ec2-18-235-97-230.compute-1.amazonaws.com',
    dialect: 'postgres',
  },
};
