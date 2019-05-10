/**
 * @author {[Monty Khanna]}
 */
const Hapi = require('hapi');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const {
  before,
  describe,
  it,
  expect,
} = lab;
const server = Hapi.server();

describe('Routes /v1/session', async () => {
  let token;
  before(async (done) => {
    const options = {
      method: 'POST',
      url: '/v1/session',
      payload: {
        username: 'mack',
        password: 'bohemia',
      },
    };
    
    const response = await server.inject(options);
    console.log('response.result -- ', response.result);
    token = response.result.token;
    console.log('Here id token -- ', token);
    done();
  });
  
  console.log('token --------------- ', token);
  
  describe('GET /v1/user', () => {
    it('return 1 todo at a time', (done) => {
      const options = {
        method: 'GET',
        url: '/v1/user?limit=20&sortBy=first_name&order=asc',
        headers: { 'Authorization': 'Bearer ' + token },
      };
      server.inject(options, (response) => {
        console.log('here is response -- ', response);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});