/**
 * @author {[Monty Khanna]}
 */
import jwt from 'jsonwebtoken';

const jwtDefault = {
  expiresIn: '1h',
  algorithm: 'HS256'
};

const JwtSign = (credentials, options = {}) => {
  Object.assign(options, jwtDefault);
  return jwt.sign(credentials, process.env.JWT_KEY, options);
};

const JwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

const JwtDecode = (token) => {
  return jwt.decode(token, { complete: true });
};

module.exports = {
  JwtSign,
  JwtVerify,
  JwtDecode
};
