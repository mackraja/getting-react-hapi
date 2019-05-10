/**
 * @author {[Monty Khanna]}
 */
module.exports = {
  auth: 'jwt', // session, jwt
  
  tags: ['api', 'Session'],
  
  description: 'Destroy Session',
  
  notes: 'Logout user from system',
  
  handler: (request, h) => {
    // Hapi Auth Jwt2
    // unset the state from client side.
    
    
    // Hapi Auth Cookie
    request.server.app.cache.drop(request.state.authCookie.sid);
    request.cookieAuth.clear();

    return h.response('User Successfully Logout.');
  },
};
