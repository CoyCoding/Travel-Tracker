const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: String,
  revoked: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
