/**
 * @author {[Monty Khanna]}
 */
import Sequelize from 'sequelize';
import settings from 'config';

const configuration = Object.assign({}, settings.db);

const { database, username, password } = configuration;

delete configuration.database;
delete configuration.username;
delete configuration.password;

const db = new Sequelize(database, username, password, configuration);

db.models.User = db.import('./models/user');
db.models.Role = db.import('./models/role');

module.exports = db;
