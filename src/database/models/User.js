const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  picture: String,
  locale: String,
  email: String,
  email_verified: Boolean,
  sub: String,
}, {
  timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
