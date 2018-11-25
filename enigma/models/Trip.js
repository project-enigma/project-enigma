const mongoose = require('mongoose');

const { Schema }   = mongoose;
require('dotenv').config();

const TripSchema = new Schema({
  from: { type: String },
  to: { type: String },
  description: { type: String },
  price: { type: Schema.Types.Decimal128 },
  depart: { type: Date },
  return: { type: Date },
  users: { type: Array },
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
