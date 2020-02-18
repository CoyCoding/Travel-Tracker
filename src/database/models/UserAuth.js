const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const { Schema } = mongoose;

const userAuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  refresh_token: String,
  voided_tokens: [String],
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema);

// function to validate user
const validateUserAuth = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  email: Joi.string().min(5).max(255).required()
    .email(),
  password: Joi.string().min(5).max(255).required(),
});

module.exports = { UserAuth, validateUserAuth };
