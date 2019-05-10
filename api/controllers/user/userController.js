/**
 * @author {[Monty Khanna]}
 */
import config from 'config';
import userList from './userList'; // eslint-disable-line
import userCreate from './userCreate'; // eslint-disable-line
import userEdit from './userEdit'; // eslint-disable-line
import userDelete from './userDelete'; // eslint-disable-line

const prefix = config.basePath;

module.exports = [
  {
    path: `${prefix}/user`,
    method: 'GET',
    config: userList,
  },
  {
    path: `${prefix}/user`,
    method: 'POST',
    config: userCreate,
  },
  {
    path: `${prefix}/user/{id}`,
    method: 'PUT',
    config: userEdit,
  },
  {
    path: `${prefix}/user/{id}`,
    method: 'DELETE',
    config: userDelete,
  },
];
