/**
 * @author {[Monty Khanna]}
 */
import db from '../db'; // eslint-disable-line

const { User } = db.models;

exports.authenticate = username => User.findOne({
  attributes: ['id', 'password'],
  where: { $or: { username, email: username } },
});

exports.validUser = id => User.findByPk(id);

exports.getUser = id => User.findOne({
  attributes: ['id', 'first_name', 'last_name', 'username', 'status'],
  where: { id },
});
