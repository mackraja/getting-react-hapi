/**
 * @author {[Monty Khanna]}
 */
import Sequelize from 'sequelize';
import settings from 'config';

const configuration = Object.assign({}, settings.db);

const { host, database, username, password, dialect } = configuration;

let db;
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL,
        {
            dialect,
            protocol: dialect
        });
} else {
    db = new Sequelize({
        dialect,
        host,
        database,
        username,
        password
    });
}

db.models.User = db.import('./models/user');
db.models.Role = db.import('./models/role');

module.exports = db;
