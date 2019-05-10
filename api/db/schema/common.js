/**
 * @author {[Monty Khanna]}
 */
import joi from 'joi';

const _stringSchema = joi.string();
const _alphaNumSchema = joi.string().alphanum();
const _integerSchema = joi.number().integer();
const _nameSchema = _alphaNumSchema.min(2).max(30);
const _surnameSchema = _alphaNumSchema.min(2).max(50);
const _birthDate = joi.date().min('1-1-1900').max('1-1-2012');
const _birthYearSchema = _integerSchema.min(1900).max(2012);
const _emailSchema = _stringSchema.email();
const _ipSchema = _stringSchema.ip();
const _creditCardSchema = _stringSchema.creditCard();
const _tokenSchema = _stringSchema.token().length(32).required()
  .error(() => 'Invalid token');

module.exports = {
  _stringSchema,
  _alphaNumSchema,
  _integerSchema,
  _nameSchema,
  _surnameSchema,
  _birthDate,
  _birthYearSchema,
  _emailSchema,
  _ipSchema,
  _creditCardSchema,
  _tokenSchema,
};
