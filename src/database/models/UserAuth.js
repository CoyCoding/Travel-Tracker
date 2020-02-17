const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema({
  username: requiredString,
  email: requiredString,
  password: requiredString,
}, {
  timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
