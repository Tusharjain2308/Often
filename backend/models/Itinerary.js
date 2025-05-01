const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  description: String
}, { _id: false });

const transferSchema = new mongoose.Schema({
  from: String,
  to: String
}, { _id: false });

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String
}, { _id: false });

const daySchema = new mongoose.Schema({
  dayNumber: Number,
  hotel: hotelSchema,
  transfers: [transferSchema],
  activities: [activitySchema]
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  duration: { type: Number, required: true },
  days: [daySchema]
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);
