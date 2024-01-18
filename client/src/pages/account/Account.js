import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListIcon from "@mui/icons-material/List";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { useNavigate } from "react-router-dom";

const Account = ({ isActive }) => {
  console.log(isActive);
  const navigate = useNavigate();
  let isActiveStyle = {
    background: "#ff6699  ",
    padding: "10px 15px",
    borderRadius: "20px",
    width: "11rem",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 5px 2px #999999",
    ":hover":{background:"#ff80aa"}
    
  };

  let isInactiveStyle = {
    background: "#d9d9d9",
    padding: "10px 15px",
    borderRadius: "20px",
    width: "11rem",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    ":hover":{background:"#a6a6a6"}
    
  };

  useEffect(()=>{
    if(isActive === undefined)
    navigate('/account/profile')
  })

  const navigateAccomodation = () =>{
    navigate('/account/accomodation')
  }

  const navigateProfile = () =>{
    navigate('/account/profile')
  }

  const navigateBooking= () =>{
    navigate('/account/booking')
  }



  return (
    <Box>
      <Box sx={{ margin: "10px auto", width: "50vw" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "2.5rem",
          }}
        >
          <Box
            sx={isActive==="profile" || isActive===undefined ? isActiveStyle : isInactiveStyle}
            onClick={navigateProfile}
          >
            <PermIdentityIcon sx={{ margin: "0 10px" }} />
            <Typography>My Profile</Typography>
          </Box>
          <Box
            sx={isActive==="booking" ? isActiveStyle : isInactiveStyle}
            onClick={navigateBooking}
          >
            <ListIcon sx={{ margin: "0 10px" }} />
            <Typography>My bookings</Typography>
          </Box>
          <Box
            sx={isActive==="accomodation" ? isActiveStyle : isInactiveStyle}
            onClick={navigateAccomodation}
          >
            <AddHomeIcon sx={{ padding: "0 2px 0 0" }} />
            <Typography>My accommodations</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
