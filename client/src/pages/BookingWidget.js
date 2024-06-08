import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CustomButton from "./CustomButton";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
let baseUrl = "http://localhost:5000";
const BookingWidget = ({ place }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInValidation, setCheckInValidation] = useState(false);
  const [checkOutValidation, setCheckOutValidation] = useState(false);
  const [numberOfGuestValidation, setNumberOfGuestValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [phoenError, setPhoneError] = useState("");
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
    setCheckInValidation(false);
    setValidationMessage("")
  };
  const handleCheckout = (e) => {
    setCheckout(e.target.value);
    setCheckOutValidation(false)
    setValidationMessage("")
  };
  const handleGuest = (e) => {
    setNumberOfGuest(e.target.value);
    setNumberOfGuestValidation(false)
    setValidationMessage("")
  };

  const handleName = (e) => {
    setName(e.target.value);
    setValidationMessage("")
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setValidationMessage("")
    setPhoneError("")
  };

  const calculatePrice = () => {
    let totalPrice = place.price * numberOfNights();
    return totalPrice;
  };
  const phoneRegex = /^\d{10}$/; // Example: validates a 10-digit phone number
  const navigateToLogin = () =>{
    navigate("/login")
  }
  const handleBooking = async () => {
    if (new Date(checkin) < new Date(getTodayDate())) {
      setCheckInValidation(true);
    } else if (new Date(checkout) <= new Date(checkin)) {
      setCheckOutValidation(true);
    } else if(numberOfGuest < 1){
      setNumberOfGuestValidation(true)
    } else if(!phoneRegex.test(phone)){
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      let response = await fetch(baseUrl + "/booking/create-booking", {
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
      if (result?.message === "Booking successfully done!")
        navigate("/account/booking/" + result?.bookingDetail?._id);
      else {
        setValidationMessage(result?.message)
      }
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CurrencyRupeeIcon />
        <Typography variant="h5">
          {place.price} <span style={{ color: "gray" }}> / night</span>
        </Typography>
      </Box>
      <Box>
        {numberOfGuestValidation && <Typography sx={{color:"red"}}>Please add number of guest</Typography>}
        {phoenError && <Typography sx={{color:"red"}}>{phoenError}</Typography>}
        {validationMessage && <Typography sx={{color:"red"}}>{validationMessage}</Typography>}
        {checkInValidation && <Typography sx={{color:"red"}}>Invalid start date</Typography>}
        {checkOutValidation && <Typography sx={{color:"red"}}>Invalid end date</Typography>}
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
                CHECK-IN<span style={{color:"red"}}>*</span>
              </Typography>
              <input
                type="date"
                style={{ border: "none", padding: "5px" }}
                value={checkin}
                onChange={handleCheckin}
                min={getTodayDate()}
              />
            </Box>
            <Box sx={{ padding: " 10px 20px 10px 10px " }}>
              {" "}
              <Typography variant="p" fontWeight={"bold"} fontSize={"15px"}>
                CHECK-OUT<span style={{color:"red"}}>*</span>
              </Typography>{" "}
              <input
                type="date"
                style={{ border: "none", padding: "5px" }}
                value={checkout}
                onChange={handleCheckout}
                min={checkin}
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
              Guests<span style={{color:"red"}}>*</span>
            </Typography>
            <input
              type="number"
              style={{
                border: "1px solid gray",
                padding: "10px",
                outline: "none",
                borderRadius: "10px",
              }}
              placeholder="Ex: 2"
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
                Name<span style={{color:"red"}}>*</span>
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
                Phone<span style={{color:"red"}}>*</span>
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
                placeholder="10 digit mob no."
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
          onClick={user ? handleBooking: navigateToLogin }
        />
      </Box>
    </Box>
  );
};

export default BookingWidget;
