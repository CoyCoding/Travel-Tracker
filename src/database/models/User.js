const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  picture: String,
  locations: [String],
  email: String,
  email_verified: Boolean,
  following: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, {
  timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
