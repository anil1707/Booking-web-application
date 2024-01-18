const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: String, },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price:Number
});

const place = mongoose.model("place", placeSchema);

module.exports = place;
