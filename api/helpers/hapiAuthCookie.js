/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import hapiAuthCookie from 'hapi-auth-cookie';

const register = async (server) => {
  await server.register(hapiAuthCookie);
  
  const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
  server.app.cache = cache;
  
  server.auth.strategy('session', 'cookie', {
    password: 'Ze0lAaC80c5PCsh3jP5LEQd5n7wVny7Hh1llPNV72Kk=', // password-should-be-32-characters
    cookie: 'authCookie',
    isSecure: false,
    validateFunc: async (request, session) => {
      let out = {};
      try {
        const cached = await cache.get(session.sid);
        out = { valid: !!cached };
        if (out.valid) {
          out.credentials = cached.user;
        }
      } catch (e) {
        Boom.unauthorized(e);
      }
      return out;
    },
  });
};

exports.plugin = {
  register,
  name: 'authentication',
  version: '1.0.0',
  once: true,
};
