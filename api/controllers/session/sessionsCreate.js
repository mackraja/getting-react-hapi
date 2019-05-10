/**
 * @author {[Monty Khanna]}
 */
import joi from 'joi';
import Boom from 'boom';
import { sessionService } from '../../services'; // eslint-disable-line
import { hashPassword, i18n, jwtHelper } from '../../helpers'; // eslint-disable-line

const { comparePass } = hashPassword;
const { JwtSign } = jwtHelper;

module.exports = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  tags: ['api', 'Session'],

  description: 'Authenticate User',

  notes: 'Authenticate User',

  validate: {
    payload: {
      username: joi.string()
        .max(250)
        .required()
        .description(i18n.__('controllers.session.payload.username')),

      password: joi.string()
        .max(250)
        .required()
        .description(i18n.__('controllers.session.payload.password')),
    },
    options: { abortEarly: false },
  },

  handler: async (request, h) => {
    const { payload } = request;
    const { username, password } = payload;
    let data = {};

    try {
      const user = await sessionService.authenticate(username);
      
      // Check User Exist or Not
      if (!user) {
        return Boom.unauthorized(i18n.__('controllers.session.invalidUsername'));
      }

      // Match Password
      const match = await comparePass(password, user.password);
      if (!match) {
        return Boom.badRequest(i18n.__('controllers.session.invalidPassword'));
      }

      /**
       * Authentications Methods:
       * 1.) Hapi Auth Jwt2
       * 2.) Hapi Auth Cookie
       */

      // 1.) Hapi Auth Jwt2
      //      If encrypted password not saved in db then uncomment below lines and define "generatePass" method
      //      const newpass = await generatePass(password);
      //      console.log('newpass ----- ', newpass);

       const credentials = { id: user.id };
       const options = {
         issuer: 'Getting React',
         subject: 'montykhanna007@hotmail.com',
         audience: 'Monty Khanna',
       };
       const token = JwtSign(credentials, options);
       data = { token };

      // 2.) Hapi Auth Cookie
      // const sid = String(user.id);
      // await request.server.app.cache.set(sid, { user }, 0);
      // request.cookieAuth.set({ sid });
      // data = { id: user.id };

    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.session.createUser'), e);
    }
    return h.response(data);
  },
};
