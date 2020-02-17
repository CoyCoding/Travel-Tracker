const Joi = require('@hapi/joi');

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.email().required(),
  password: Joi.string().required(),
});

module.exports = signUpSchema;
