// server/models/Event.js
/*
 |--------------------------------------
 | Event Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  startDatetime: { type: Date, required: true },
  endDatetime: { type: Date, required: true },
  id: String,
  start_date: String,
  end_date: String,
  counselor: String,
  description: String,
  viewPublic: { type: Boolean, required: true }
});

module.exports = mongoose.model('Event', eventSchema);