const mongoose = require('mongoose');

const { Schema }   = mongoose;
require('dotenv').config();

const TripSchema = new Schema({
  from: { type: String },
  to: { type: String },
  tips: { type: String },
  price: { type: Number },
  depart: { type: Date },
  return: { type: Date },
  users: { type: Array, default: [] },
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
