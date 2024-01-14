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
  category: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: "Categories"
    }],
    required: false,
  },
  publisher: {
    type: Boolean,
    default: true
  },
  published_date: {
   type: Date,
   default: Date.now
  },
  url: {
    type: String,
    required: false,
    unique: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Events = mongoose.model('events', EventsSchema);