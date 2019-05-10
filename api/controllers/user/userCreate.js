/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import db from '../../db';
import { _add } from '../../db/repositories'; // eslint-disable-line
import {
  _nameSchema,  // eslint-disable-line
  _surnameSchema, // eslint-disable-line
  _integerSchema,  // eslint-disable-line
  _stringSchema,  // eslint-disable-line
  _emailSchema,  // eslint-disable-line
} from '../../db/schema';
import { i18n } from '../../helpers'; // eslint-disable-line

const { User } = db.models;

module.exports = {
  auth: false, // jwt, session

  tags: ['api', 'User'],

  description: 'Create User',

  notes: 'Create new user',

  validate: {
    query: {
      role_id: _integerSchema.required().description(i18n.__('controllers.user.query.role_id')),
      
      first_name: _nameSchema.required().description(i18n.__('controllers.user.query.first_name')),

      last_name: _surnameSchema.description(i18n.__('controllers.user.query.last_name')),

      status: _integerSchema.default(0).description(i18n.__('controllers.user.query.status')),

      username: _stringSchema.required().description(i18n.__('controllers.user.query.username')),

      password: _stringSchema.required().description(i18n.__('controllers.user.query.password')),

      email: _emailSchema.required().description(i18n.__('controllers.user.query.email')),
    },
    options: { abortEarly: false },
  },

  handler: async (request, h) => {
    const { query } = request;
    let users = {};

    try {
      users = await _add(User, query);
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.session.createUser'), e);
    }
    return h.response(users);
  },
};
