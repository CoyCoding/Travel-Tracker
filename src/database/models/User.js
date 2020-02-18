const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  picture: String,
  locations: [String],
  email: String,
  email_verified: Boolean,
  friends: [String],
  out_going_fr: [String],
  incoming_fr: [String],
}, {
  timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
