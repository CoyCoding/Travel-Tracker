const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  given_name: String,
  nickname: String,
  name: String,
  picture: String,
  locale: String,
  updated_at: Date,
  email: String,
  email_verified: Boolean,
  sub: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
