/**
 * @author {[Monty Khanna]}
 */
import {} from 'dotenv/config';
import Hapi from 'hapi';

import { connections, registrations } from './manifest'; // eslint-disable-line
import { authenticate } from './helpers'; // eslint-disable-line
import { name as serverName } from '../package.json';

const dbPort = process.env.NODE_ENV === 'development' ? process.env.DB_PORT : process.env.PORT;

const serverOptions = Object.assign({}, {
  host: process.env.HOST,
  port: dbPort
}, connections);

const server = Hapi.server(serverOptions);

const healthCheck = async () => {
  await authenticate.checkDbConnection();
};

const init = async () => {
  await server.register(registrations);

  await healthCheck();

  await server.start();

  console.info('\n==> ✅  %s is running, talking to API server on port %s.', serverName, dbPort);
  
  console.info('==> 💻  Open %s%s in a browser to view the api docs.\n\n', server.info.uri, '/documentation');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

// node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
