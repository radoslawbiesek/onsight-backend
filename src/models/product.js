const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
