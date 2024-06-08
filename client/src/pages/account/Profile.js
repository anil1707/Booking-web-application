import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import Account from "./Account";
let baseUrl = "http://localhost:5000";
const Profile = () => {
  let navigate = useNavigate();
  let { user, setUser, setUserDetail, userDetail } = useContext(UserContext);
  const handleLogout = () => {
    fetch(baseUrl + "/user/logout", {
      method: "get",
      credentials: "include",
    });
    setUser("");
    setUserDetail({});
    navigate("/");
  };
  return (
    <Box>
      <Account isActive={"profile"} />

      <Box
        sx={{
          width: "50vh",
          margin: "10vh auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            background: "#e6e6e6",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Name: {user?.[0].toUpperCase() + user?.substring(1)}
        </Typography>
        <Typography
          sx={{
            background: "#e6e6e6",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Email: {userDetail?.email}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "26vw",
            height: "50px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
