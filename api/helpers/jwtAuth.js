/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import { sessionService } from '../services'; // eslint-disable-line

const validate = async (credentials) => {
  const { id } = credentials;
  let result = {};
  try {
    const user = await sessionService.validUser(id);
    if (user) {
      result = { isValid: true, credentials };
    }
  } catch (e) {
    Boom.unauthorized(e);
    result = { isValid: false };
  }
  return result;
};

const register = async (server) => {
  await server.register(hapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_KEY,
    validate,
    verifyOptions: { algorithms: ['HS256'] },
  });
};

exports.plugin = {
  register,
  name: 'authentication',
  version: '1.0.0',
  once: true,
};
