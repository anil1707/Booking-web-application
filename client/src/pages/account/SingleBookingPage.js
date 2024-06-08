import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Box, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Loading from "../Loading";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import { differenceInCalendarDays, format } from "date-fns";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

let baseUrl = "http://localhost:5000";
const SingleBookingPage = () => {
  const { user } = useContext(UserContext);
  let { id } = useParams();
  const [booking, setBooking] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowAllPhoto, setIsShowAllPhoto] = useState(false);
  const naviage = useNavigate();
  useEffect(() => {
    if (user) {
      fetch(`${baseUrl}/booking/booking-by-id/${id}`, {
        method: "get",
        credentials: "include",
      }).then((response) => {
        response
          .json()

          .then((result) => {
            if (result.message === "Data get successfully") {
              setBooking(result.bookingDetail);
              setIsLoading(false);
            }
          });
      });
    }
  }, [user, id]);

  if (isShowAllPhoto) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "0",
          background: "black",
          color: "white",
          minWidth: "100%",
          minHeight: "screen",
          zIndex: "20",
          transition: ".5s",
          padding: "20px 0",
        }}
      >
        <Box
          sx={{
            padding: "3px",
            background: "white",
            color: "black",
            fontWeight: "bold",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "9vw",
            borderRadius: "10px",
            gap: "3px",
            top: "20px",
            right: "20px",
            ":hover": { background: "#d9d9d9" },
            cursor: "pointer",
          }}
          onClick={() => setIsShowAllPhoto(false)}
        >
          <CloseIcon />
          <Typography variant="h6">Close photos</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: "10px",
            }}
          >
            {booking.place?.photos?.length > 0 &&
              booking.place.photos.map((link, index) => {
                return (
                  <img
                    key={index}
                    src={"http://localhost:5000/uploads/" + link}
                    style={{ objectFit: "cover", width:"1000px", height:"600px" }}
                    alt=""
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        margin: "20px 0",
        background: "#e6e6e6",
        padding: "10px 0",
        height: "87vh",
      }}
    >
      <Box
        sx={{
          width: "60vw",
          margin: "20px auto",
          background: "#e6e6e6",
          padding: "10px 0",
        }}
      >
        {isLoading && <Loading />}
        {!isLoading && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              sx={{ margin: "5px 0" }}
            >
              {booking?.place?.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnOutlinedIcon />
              <a
                target="__blank"
                href={"https://map.google.com/?q=" + booking?.place?.address}
                style={{ color: "black", fontWeight: "bolder" }}
              >
                {booking?.place?.address}
              </a>
            </Box>
            <Box
              sx={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                margin: "20px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  marginBottom={"10px"}
                >
                  Booking Information
                </Typography>

                {/* booking information */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    marginBottom: "5px",
                  }}
                >
                  <Typography marginRight={"3px"}>
                    {differenceInCalendarDays(
                      new Date(booking?.checkout),
                      new Date(booking?.checkin)
                    )}
                    <span> nights :</span>
                  </Typography>
                  <Typography>
                    {format(new Date(booking?.checkin), "yyyy-MM-dd")}
                  </Typography>
                  <ArrowRightAltIcon fontSize="small" />
                  <Typography>
                    {format(new Date(booking?.checkout), "yyyy-MM-dd")}
                  </Typography>
                </Box>
                <Typography variant="h6" color={"gray"}>
                  Name: {booking.name}
                </Typography>
                <Typography color={"gray"}>Phone: {booking?.phone}</Typography>
                <Typography color={"gray"}>
                  Date:{" "}
                  {format(new Date(booking?.createdAt), "yyyy/mm/dd, hh:mm:ss")}
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#ff6699",
                  padding: "20px",
                  borderRadius: "15px",
                }}
              >
                <Typography> Total Price</Typography>
                <Typography variant="h5" fontWeight={"bold"}>
                  Rs. {booking?.price}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr",
                  gap: "8px",
                  height: "45vh",
                  overflow: "hidden",
                  position: "relative",
                  marginTop: "8px",
                  borderRadius: "15px",
                }}
              >
                <Box>
                  <img
                    src={
                      "http://localhost:5000/uploads/" +
                      booking?.place?.photos[0]
                    }
                    alt={booking?.place?.photos[0]}
                    style={{
                      objectFit: "cover",
                      height: "46.5vh",
                      width: "30vw",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={
                      "http://localhost:5000/uploads/" +
                      booking?.place?.photos[1]
                    }
                    alt={booking?.place?.photos[1]}
                    style={{
                      objectFit: "cover",
                      width: "15vw",
                      height: "23vh",
                    }}
                  />
                  <img
                    src={
                      "http://localhost:5000/uploads/" +
                      booking?.place?.photos[2]
                    }
                    alt={booking?.place?.photos[2]}
                    style={{
                      objectFit: "cover",
                      width: "15vw",
                      height: "23vh",
                    }}
                  />
                  <img
                    src={
                      "http://localhost:5000/uploads/" +
                      booking?.place?.photos[3]
                    }
                    alt={booking?.place?.photos[3]}
                    style={{
                      objectFit: "cover",
                      width: "15vw",
                      height: "23vh",
                    }}
                  />
                  <img
                    src={
                      "http://localhost:5000/uploads/" +
                      booking?.place?.photos[4]
                    }
                    alt={booking?.place?.photos[4]}
                    style={{
                      objectFit: "cover",
                      width: "15vw",
                      height: "23vh",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    background: "white",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 7px",
                    gap: "2px",
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    ":hover": { background: "#d9d9d9" },
                    cursor: "pointer",
                    transition: ".5s",
                  }}
                  onClick={() => setIsShowAllPhoto(true)}
                >
                  <AppsIcon />
                  <Typography variant="h7">Show all photos</Typography>
                </Box>
              </Box>
            </Box>
            {booking?.place?._id ? (
              <Typography
                sx={{
                  marginTop: "20px",
                  padding: "10px",
                  background: "#cccccc",
                  width: "10vw",
                  textAlign: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  ":hover": { background: "gray" },
                }}
                onClick={() => naviage("/place/" + booking?.place?._id)}
              >
                Know more about place
              </Typography>
            ) : (
              <Typography
                sx={{
                  marginTop: "20px",
                  padding: "10px",
                  background: "#cccccc",
                  width: "50vw",
                  textAlign: "center",
                  borderRadius: "8px",
                  
                }}
              >
                This accomondation is no longer available
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleBookingPage;
