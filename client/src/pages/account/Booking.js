import React, { useContext, useEffect, useState } from "react";
import Account from "./Account";
import { Box, Typography } from "@mui/material";
import { UserContext } from "../../UserContext";
import { differenceInCalendarDays, format } from "date-fns";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) return;
    getBookings();
  }, [user]);
  const getBookings = async () => {
    let response = await fetch("http://localhost:5000/booking/all-booking", {
      method: "get",
      credentials: "include",
    });

    let result = await response.json();
    setBookings(result.bookings);
  };

  const handleBookingById = (id) =>{
    console.log(id);
    navigate('/account/booking/'+id)
  }
  return (
    <div>
      <Account isActive={"booking"} />
      <Box sx={{ width: "65vw", margin: "40px auto", overflow: "none" }}>
        {bookings &&
          bookings.length > 0 &&
          bookings.map((booking, index) => {
            console.log(booking);
            return (
              <Box key={index}
                sx={{
                  borderRadius: "20px",
                  marginTop: "20px",
                  background: "#f2f2f2",
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={()=>handleBookingById(booking._id)}
              >
                <Box>
                  <img
                    style={{
                      width: "16vw",
                      height: "20vh",
                      borderRadius: "20px 0 0 20px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                    src={
                      "http://localhost:5000/uploads/" + booking.place.photos[0]
                    }
                  />
                </Box>
                <Box sx={{ padding: "10px" }}>
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    marginBottom={"10px"}
                  >
                    {booking.place.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      color: "gray",
                      marginBottom: "5px",
                    }}
                  >
                    <Typography marginRight={"3px"}>
                      {differenceInCalendarDays(
                        new Date(booking.checkout),
                        new Date(booking.checkin)
                      )}
                      <span> nights :</span>
                    </Typography>
                    <Typography>
                      {format(new Date(booking.checkin), "yyyy-MM-dd")}
                    </Typography>
                    <ArrowRightAltIcon fontSize="small" />
                    <Typography>
                      {format(new Date(booking.checkout), "yyyy-MM-dd")}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography marginBottom={"10px"} color={"gray"}>
                      Booking Date:{" "}
                      {format(
                        new Date(booking.createdAt),
                        "yyyy-MM-dd, hh:mm:ss"
                      )}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                    >
                      Totol Price: Rs. {booking.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </div>
  );
};

export default Booking;
