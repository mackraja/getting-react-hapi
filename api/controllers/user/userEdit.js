/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import db from '../../db';
import { _update } from '../../db/repositories'; // eslint-disable-line
import {
  _nameSchema,  // eslint-disable-line
  _surnameSchema, // eslint-disable-line
  _integerSchema,  // eslint-disable-line
  _stringSchema,  // eslint-disable-line
  _emailSchema,  // eslint-disable-line
} from '../../db/schema';
import { i18n } from '../../helpers'; // eslint-disable-line

const { User } = db.models;
const roleIdArr = [1, 2, 3];

module.exports = {
  auth: false, // jwt, session

  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  tags: ['api', 'User'],

  description: 'Create User',

  notes: 'Create new user',

  validate: {
    params: {
      id: _integerSchema.description(i18n.__('controllers.user.params.id')),
    },
    payload: {
      role_id: _integerSchema
        .valid(roleIdArr)
        .allow('')
        .description(i18n.__('controllers.user.query.role_id')),
      
      first_name: _nameSchema.allow('').description(i18n.__('controllers.user.query.first_name')),

      last_name: _surnameSchema.allow('').description(i18n.__('controllers.user.query.last_name')),

      status: _integerSchema.allow('').description(i18n.__('controllers.user.query.status')),

      username: _stringSchema.allow('').description(i18n.__('controllers.user.query.username')),

      password: _stringSchema.allow('').description(i18n.__('controllers.user.query.password')),

      email: _emailSchema.allow('').description(i18n.__('controllers.user.query.email')),
    },
    options: { abortEarly: false },
  },

  handler: async (request, h) => {
    const { params, payload } = request;
    const { id } = params;
    let isUpdated = {};

    try {
      isUpdated = await _update(User, payload, { where: { id } });
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.updateUser'), e);
    }
    return h.response(isUpdated);
  },
};
