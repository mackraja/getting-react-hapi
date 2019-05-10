/**
 * @author {[Monty Khanna]}
 */
import config from 'config';

import sessionsGet from './sessionsGet'; // eslint-disable-line
import sessionsCreate from './sessionsCreate'; // eslint-disable-line
import sessionsDestroy from './sessionsDestroy'; // eslint-disable-line

const prefix = config.basePath;

module.exports = [
  {
    path: `${prefix}/session`,
    method: 'GET',
    config: sessionsGet,
  },
  {
    path: `${prefix}/session`,
    method: 'POST',
    config: sessionsCreate,
  },
  {
    path: `${prefix}/session`,
    method: 'DELETE',
    config: sessionsDestroy,
  },
];
