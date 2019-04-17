// server/models/events.js
/*
 |--------------------------------------
 | events Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  id: String,
  start_date: String,
  end_date: String,
  counselor: String,
  viewPublic: { type: Boolean, required: true }
});

module.exports = mongoose.model('Events', eventsSchema);


