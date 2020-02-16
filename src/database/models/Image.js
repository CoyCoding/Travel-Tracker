const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  title: String,
  originalSrc: {
    type: String,
    required: true,
  },
  thumbnailSrc: {
    type: String,
  },
}, {
  timestamps: true,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
