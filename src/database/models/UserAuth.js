const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userAuthSchema = new Schema({
  username: requiredString,
  email: requiredString,
  password: requiredString,
  user_id: requiredString,
  refresh_token: String,
  voided_tokens: [String],
}, {
  timestamp: true,
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema);

module.exports = UserAuth;
