const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imgCover: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  publisher: {
    type: Boolean,
    default: true
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

module.exports = Events = mongoose.model('events', EventsSchema);