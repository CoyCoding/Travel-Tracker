const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  picture: String,
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  email: String,
  email_verified: Boolean,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
