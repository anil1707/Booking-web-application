import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BookingWidget from "./BookingWidget";
let baseUrl = "http://localhost:5000"
const SinglePlacePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [placeDetail, setPlaceDetail] = useState();
  const [isShowAllPhoto, setIsShowAllPhoto] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    getPlaceDetail(id);
  }, [id]);

  const getPlaceDetail = async (id) => {
    let response = await fetch(baseUrl+"/place/" + id);
    let result = await response.json();

    setPlaceDetail(result.placeData);
    if (result) {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  //   code for show all photos
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
            {placeDetail?.photos?.length > 0 &&
              placeDetail.photos.map((link, index) => {
                return (
                  <img key={index}
                    src={"http://localhost:5000/uploads/" + link}
                    style={{ objectFit: "cover",  width:"1000px", height:"600px" }}
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
    <Box sx={{ margin: "20px 0", background: "#e6e6e6", padding: "10px 0" }}>
      <Box sx={{ width: "60vw", margin: "20px auto" }}>
        <Typography variant="h5" sx={{ margin: "5px 0" }}>
          {placeDetail.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnOutlinedIcon />
          <a
            target="__blank"
            href={"https://map.google.com/?q=" + placeDetail.address}
            style={{ color: "black", fontWeight: "bolder" }}
          >
            {placeDetail.address}
          </a>
        </Box>

        {/* for showing photo */}
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
              src={"http://localhost:5000/uploads/" + placeDetail.photos[0]}
              alt={placeDetail.photos[0]}
              style={{ objectFit: "cover", height: "46.5vh", width: "30vw" }}
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
              src={"http://localhost:5000/uploads/" + placeDetail.photos[1]}
              alt={placeDetail.photos[1]}
              style={{ objectFit: "cover", width: "15vw", height: "23vh" }}
            />
            <img
              src={"http://localhost:5000/uploads/" + placeDetail.photos[2]}
              alt={placeDetail.photos[2]}
              style={{ objectFit: "cover", width: "15vw", height: "23vh" }}
            />
            <img
              src={"http://localhost:5000/uploads/" + placeDetail.photos[3]}
              alt={placeDetail.photos[3]}
              style={{ objectFit: "cover", width: "15vw", height: "23vh" }}
            />
            <img
              src={"http://localhost:5000/uploads/" + placeDetail.photos[4]}
              alt={placeDetail.photos[4]}
              style={{ objectFit: "cover", width: "15vw", height: "23vh" }}
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            marginTop: "20px",
            gap: "30px",
            lineHeight: "25px",
          }}
        >
          <Box sx={{ bgcolor: "white", padding: "20px", borderRadius: "10px" }}>
            <Typography variant="h4">Description</Typography>
            <Typography variant="h7">{placeDetail.description}</Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Typography>Check-in time: {placeDetail.checkIn}</Typography>
              <Typography>Check-out time: {placeDetail.checkOut}</Typography>
              <Typography>
                Maximum number of guests: {placeDetail.maxGuests}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ background: "white", borderRadius: "20px", padding: "30px" }}
          >
            <BookingWidget place={placeDetail} />
          </Box>
        </Box>
        <Box
          sx={{
            background: "white",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4">Extra info</Typography>
          <Typography>{placeDetail.extraInfo}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SinglePlacePage;
