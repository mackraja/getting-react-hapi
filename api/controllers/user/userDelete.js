/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import db from '../../db';
import { _delete } from '../../db/repositories'; // eslint-disable-line
import {
  _integerSchema,  // eslint-disable-line
} from '../../db/schema';
import { i18n } from '../../helpers'; // eslint-disable-line

const { User } = db.models;

module.exports = {
  auth: false, // jwt, session

  tags: ['api', 'User'],

  description: 'Delete user',

  notes: 'delete existing user',

  validate: {
    params: {
      id: _integerSchema.description(i18n.__('controllers.user.params.id')),
    },
    options: { abortEarly: false },
  },

  handler: async (request, h) => {
    const { id } = request.params;
    const queryString = { where: { id } };
    let delUser = {};

    try {
      delUser = await _delete(User, queryString);
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.deleteUser'), e);
    }
    return h.response(delUser);
  },
};
