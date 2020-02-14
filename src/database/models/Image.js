const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  title: String,
  description: String,
  originalSrc: {
    type: String,
    required: true,
  },
  thubnailSrc: {
    type: String,
  },
}, {
  timestamps: true,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;