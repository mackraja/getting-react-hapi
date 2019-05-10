/**
 * @author {[Monty Khanna]}
 */
import authenticate from './authenticate'; // eslint-disable-line
import hapiAuthCookie from './hapiAuthCookie'; // eslint-disable-line
import hashPassword from './hashPassword'; // eslint-disable-line
import i18n from './i18n'; // eslint-disable-line
import jwtAuth from './jwtAuth'; // eslint-disable-line
import jwtHelper from './jwtHelper'; // eslint-disable-line

module.exports = {
  authenticate,
  hapiAuthCookie,
  hashPassword,
  i18n,
  jwtAuth,
  jwtHelper
};
