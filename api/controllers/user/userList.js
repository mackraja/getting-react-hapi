/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import db from '../../db';
import { _getList } from '../../db/repositories'; // eslint-disable-line
import {
  _integerSchema,  // eslint-disable-line
  _stringSchema,  // eslint-disable-line
} from '../../db/schema';
import { i18n } from '../../helpers'; // eslint-disable-line

const { User } = db.models;

module.exports = {
  auth: false, // jwt, session

  tags: ['api', 'User'],

  description: 'Get All Users',

  notes: 'get details of all users',

  validate: {
    query: {
      limit: _integerSchema.default(20).description(i18n.__('controllers.user.query.limit')),

      sortBy: _stringSchema.default('first_name').description(i18n.__('controllers.user.query.sortBy')),

      order: _stringSchema.default('asc').description(i18n.__('controllers.user.query.order')),
    },
    options: { abortEarly: false },
  },

  handler: async (request, h) => {
    const { limit, sortBy, order } = request.query;
    const queryString = {
      where: { status: 1 },
      limit,
      order: [[sortBy, order]],
    };
    let userList = {};

    try {
      userList = await _getList(User, queryString);
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.fetchUser'), e);
    }
    return h.response(userList);
  },
};
