const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const booking = require("../models/booking");
const user = require("../models/user");

dotenv.config();
const createBookingCntroller = async (req, res) => {
  const { place, checkin, checkout, price, numberOfGuest, name, phone } =
    req.body;
  console.log(place, checkin, checkout, price, numberOfGuest, name, phone);
  let { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
    if (err) return err;
    if (
      !place ||
      !price ||
      !checkin ||
      !checkout ||
      !numberOfGuest ||
      !name ||
      !phone
    ) {
      console.log("in if");
      res.send({ message: "Please fill all the field" });
    } else {
      console.log("in else");
      const collection = await booking({
        user: info.email,
        place,
        checkin,
        checkout,
        price,
        numberOfGuest,
        name,
        phone,
      });

      const result = await collection.save();
      res.send({
        message: "Booking successfully done!",
        bookingDetail: result,
      });
    }
  });
};

const getBookingsController = async (req, res) => {
  try {
    let { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
      let userData = await user.findOne({ email: info.email });
      if (userData.email === info.email) {
        let bookings = await booking
          .find({ user: info.email })
          .populate("place");
        res.send({ bookings: bookings });
      }
    });
  } catch (err) {
    res.send(err);
  }
};

const getBookingById = async (req, res) => {
  const { id } = req.params;
  res.send({
    message: "Data get successfully",
    bookingDetail: await booking.findById({ _id: id }).populate('place'),
  });
};

module.exports = {
  createBookingCntroller,
  getBookingsController,
  getBookingById,
};
