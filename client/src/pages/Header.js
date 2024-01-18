import React, { useContext } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import logo from "../../src/airbnbLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { deepOrange } from "@mui/material/colors";

const Header = () => {
  let { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("handle close is clicked");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleRegister = () => {
    setAnchorEl(null);
    navigate("/register");
  };

  const handleLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  const handleLogout = async () => {
    console.log("logout clicked");
    await fetch("http://localhost:5000/user/logout", {
      method: "get",
      credentials: "include",
    });
    setUser(null);
    setAnchorEl(null);
    navigate("/");
  };

  const handleAccount = () => {
    setAnchorEl(null);
    navigate("/account");
  };
  return (
    <Box
      sx={{
        margin: "0 auto",
        marginTop: "20px",
        display: "flex",
        width: "90vw",
        justifyContent: "space-between",
        alignItems: "center",
        position:"sticky"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "6vw",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <img style={{ width: "1.5rem" }} src={logo} alt="logo" />
        <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
          Airbnb
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "18vw",
          border: "2px solid #d1cfd0",
          padding: "5px 10px",
          borderRadius: "50px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Typography>Anywhere</Typography>
        <Box sx={{ color: "gray" }}>|</Box>
        <Typography>Any week</Typography>
        <Box sx={{ color: "gray" }}>|</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "6.5vw",
            justifyContent: "space-between",
          }}
        >
          <Typography>Add guest</Typography>
          <SearchIcon
            sx={{
              border: "1px solid white",
              borderRadius: "50%",
              background: "#f52f7b",
              color: "white",
              padding: "4px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={
          user
            ? {
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "8vw",
                border: "2px solid #d1cfd0",
                borderRadius: "40px",
                padding: "5px 10px",
              }
            : {
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "5vw",
                border: "2px solid #d1cfd0",
                borderRadius: "40px",
                padding: "5px 10px",
              }
        }
      >
        <DehazeIcon
          aria-describedby={id}
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
        />
        {user ? (
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            {user[0]}
          </Avatar>
        ) : (
          <PersonIcon
            sx={{
              border: "1px solid gray",
              borderRadius: "50%",
              padding: "3px",
              background: "gray",
              color: "white",
              cursor: "pointer",
            }}
            aria-describedby={id}
            onClick={handleClick}
          />
        )}
        {user && (
          <Typography
            sx={{ textTransform: "capitalize", cursor: "pointer" }}
            onClick={handleClick}
          >
            {user}
          </Typography>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {!user && (
            <Box
              sx={{
                padding: "6px",
                width: "6vw",
                height: "10vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ cursor: "pointer", color: "black", fontWeight: "bold" }}
                onClick={handleRegister}
              >
                Sign up
              </Button>
              <hr style={{ width: "5vw" }} />
              <Button
                sx={{ cursor: "pointer", color: "black" }}
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Box>
          )}
          {user && (
            <Box
              sx={{
                padding: "10px",
                width: "6vw",
                height: "8vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ cursor: "pointer", color: "black" }}
                onClick={handleAccount}
              >
                Account
              </Button>
              <hr style={{ width: "5vw" }} />
              <Button
                onClick={handleLogout}
                sx={{ cursor: "pointer", color: "black" }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Popover>
      </Box>
    </Box>
  );
};

export default Header;
