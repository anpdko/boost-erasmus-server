const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false,
    unique: true
  },
  published_date: {
   type: Date,
   default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Categories = mongoose.model('categories', CategoriesSchema);