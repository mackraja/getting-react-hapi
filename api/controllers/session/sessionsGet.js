/**
 * @author {[Monty Khanna]}
 */
import Boom from 'boom';
import { i18n, jwtHelper } from "../../helpers";
import { sessionService } from "../../services";

module.exports = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },
  
  auth: 'jwt',
  
  tags: ['api', 'Session'],
  
  description: 'GET session user',
  
  notes: 'Returns logged in session user',
  
  handler: async (request, h) => {
    try {
      const v = await jwtHelper.JwtVerify(request.auth.token);

      const user = await sessionService.getUser(request.auth.credentials.id);
      return h.response(user);
    } catch(e) {
        Boom.badRequest(i18n.__('controllers.session.invalidToken'), e);
    }
  },
};
