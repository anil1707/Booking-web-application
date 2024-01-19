import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import Account from "./Account";

const Profile = () => {
  let navigate = useNavigate();
  let { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    fetch("https://booking-sever.onrender.com/user/logout", {
      method: "get",
      credentials: "include",
    });
    setUser("");
    navigate("/");
  };
  return (
    <Box>
      <Account  isActive={"profile"}/>

      <Box
        sx={{
          width: "50vh",
          margin: "10vh auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography>Logged in as {user}</Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "30vw" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
