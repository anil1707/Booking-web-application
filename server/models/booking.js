const mongoose = require("mongoose");
const place = require("./places");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: place },
  user: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: String, required: true },
  numberOfGuest: { type: String, required: true },
}, {
    timestamps:true
});

let booking = new mongoose.model("booking", bookingSchema);

module.exports = booking;
