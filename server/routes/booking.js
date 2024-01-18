const express = require('express')
const { createBookingCntroller, getBookingsController, getBookingById } = require('../controller/booking')

const bookingRouter = express.Router()

bookingRouter.post("/create-booking", createBookingCntroller)
bookingRouter.get("/all-booking", getBookingsController)
bookingRouter.get("/booking-by-id/:id", getBookingById)

module.exports = {bookingRouter}