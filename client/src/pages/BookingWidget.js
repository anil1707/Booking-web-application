import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CustomButton from "./CustomButton";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  useEffect(() => {
    setName(user);
  }, [user]);

  const numberOfNights = () => {
    return differenceInCalendarDays(new Date(checkout), new Date(checkin));
  };
  const handleCheckin = (e) => {
    setCheckin(e.target.value);
  };
  const handleCheckout = (e) => {
    setCheckout(e.target.value);
  };
  const handleGuest = (e) => {
    setNumberOfGuest(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const calculatePrice = () => {
    let totalPrice = place.price * numberOfNights();
    return totalPrice;
  };

  const handleBooking = async () => {
    let response = await fetch("https://booking-sever.onrender.com/booking/create-booking", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        place: place._id,
        checkin,
        checkout,
        numberOfGuest,
        name,
        phone,
        price: calculatePrice(),
      }),
      credentials: "include",
    });

    let result = await response.json();
    console.log(result);
    if (result?.message === "Booking successfully done!")
    console.log(result?.bookingDetail?._id);
      navigate("/account/booking/" + result?.bookingDetail?._id);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CurrencyRupeeIcon />
        <Typography variant="h5">
          {place.price} <span style={{ color: "gray" }}> night</span>
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            border: "3px solid #d9d9d9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ borderRight: "3px solid #d9d9d9", padding: "10px" }}>
              <Typography variant="p" fontWeight={"bold"} fontSize={"15px"}>
                CHECK-IN
              </Typography>
              <input
                type="date"
                style={{ border: "none", padding: "5px" }}
                value={checkin}
                onChange={handleCheckin}
              />
            </Box>
            <Box sx={{ padding: " 10px 20px 10px 10px " }}>
              {" "}
              <Typography variant="p" fontWeight={"bold"} fontSize={"15px"}>
                CHECK-OUT
              </Typography>{" "}
              <input
                type="date"
                style={{ border: "none", padding: "5px" }}
                value={checkout}
                onChange={handleCheckout}
              />
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: "3px solid #d9d9d9",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              marginBottom: "5px",
            }}
          >
            <Typography variant="p" fontWeight={"bold"} fontSize={"15px"}>
              Guests
            </Typography>
            <input
              type="number"
              style={{
                border: "1px solid gray",
                padding: "10px",
                outline: "none",
                borderRadius: "10px",
              }}
              value={numberOfGuest}
              onChange={handleGuest}
            />
          </Box>
          {checkin && checkout && (
            <Box
              sx={{
                borderTop: "3px solid #d9d9d9",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="p" fontWeight={"bold"} fontSize={"15px"}>
                Name
              </Typography>
              <input
                type="text"
                value={name}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  outline: "none",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
                onChange={handleName}
              />
              <Typography variant="p" fontWeight={"bold"} fontSize={"15px"}>
                Phone
              </Typography>
              <input
                type="tel"
                value={phone}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  outline: "none",
                  borderRadius: "10px",
                }}
                onChange={handlePhone}
              />

              <Typography
                style={{
                  border: "1px solid gray",
                  padding: "7px",
                  outline: "none",
                  borderRadius: "10px",
                  marginTop: "10px   ",
                }}
              >
                Total Price:{" "}
                {`${place.price} * ${numberOfNights()} = ` + calculatePrice()}
              </Typography>
            </Box>
          )}
        </Box>
        <CustomButton
          text={"Book Now"}
          customStyle={{ marginTop: "15px" }}
          onClick={handleBooking}
        />
      </Box>
    </Box>
  );
};

export default BookingWidget;
