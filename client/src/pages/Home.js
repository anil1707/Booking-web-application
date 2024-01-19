import { Box, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  console.log(process.env);
  let { user, setUser } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      fetch("http://localhost:5000/user/profile", {
        method: "get",
        credentials: "include",
      }).then((response) => {
        response.json().then((result) => {
          setUser(result?.userName);
        });
      });
    }
    getAllPlace();
  }, [user,setUser]);

  const getAllPlace = async () => {
    let response = await fetch("https://booking-sever.onrender.com/place/all-place");
    let result = await response.json();
    console.log(result);
    if (result) setIsLoading(false);
    setPlaces([...result.placeData]);
  };
  // console.log(places);
  const handleSinglePlace = (id) => {
    navigate("/place/" + id);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box sx={{ width: "90vw", margin: "0 auto" }}>
      <Box
        sx={{
          width: "90vw",
          display: "grid",
          gridTemplateColumns: "repeat(5, 2fr)",
          gap: "15px",
          margin: "50px auto",
        }}
      >
        {places.map((place, index) => {
          return (
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => handleSinglePlace(place._id)}
            >
              <Paper
                key={index}
                sx={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  width: "17vw",
                  height: "35vh",
                  overflow: "none",
                  borderRadius: "12px",
                }}
              >
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                  src={`http://localhost:5000/uploads/${place.photos[0]}`}
                  alt=""
                />
              </Paper>
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="h5">{place.address}</Typography>
                <Typography variant="h6" color={"gray"}>
                  {place.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}
                  >
                    <CurrencyRupeeIcon sx={{ width: "16px", height: "16px" }} />
                    {place.price}
                  </span>
                  <span style={{ color: "gray" }}>per night</span>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
