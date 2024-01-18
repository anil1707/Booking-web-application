import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "./Error";
import * as EmailValidator from "email-validator";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomButton from "./CustomButton";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    userName: false,
  });
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsFailed(false);
    setIsValid({ email: false });
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setIsFailed(false);
    setIsValid({ userName: false });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setIsFailed(false);
    setIsValid({ password: false });
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsFailed(false);
    setIsValid({ password: false });
  };

  const handleRgister = async (e) => {
    try {
      if (userName === "") {
        setIsValid({ userName: true });
        return
      }
      if (!EmailValidator.validate(email)) {
        setIsValid({ email: true });
        return;
      }
      console.log("password", password, confirmPassword);
      if (password !== confirmPassword) {
        setIsValid({ password: true });
        return;
      }

      let response = await fetch("https://booking-sever.onrender.com/user/register", {
        method: "POST",
        body: JSON.stringify({
          userName,
          email,
          password,
          confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      console.log(result);
      if (
        result.message ===
        "User already exist, Please try with another email or login"
      ) {
        console.log("already exist");
        setIsFailed(true);
        setMessage(
          "User already exist, Please try with another email or login"
        );
        return;
      }
      if (result.message === "successfully registered") {
        navigate("/login");
      } else if ((result.message = "Someting went wrong!")) {
        setIsFailed(true);
        setMessage(result.error);
      } else {
        console.log("else");
        setIsFailed(true);
        setMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "45vh",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Register</Typography>
          <Box>
            <TextField
              value={userName}
              onChange={handleUserName}
              placeholder="User Name"
              sx={{ width: "30vw" }}
            />
            {isValid.userName && (
              <Error message={"Please enter user name"} margin={"5px 0"} />
            )}
          </Box>
          <Box>
            <TextField
              value={email}
              onChange={handleEmail}
              placeholder="Emial"
              sx={{ width: "30vw" }}
            />
            {isValid.email && (
              <Error
                fontSize="1px"
                marginTop="8px"
                marginBottom="5px"
                message={"Please enter a valid email!"}
              />
            )}
          </Box>
          <TextField
            value={password}
            onChange={handlePassword}
            placeholder="Password"
            type={!showPassword ? "password" : ""}
            sx={{ width: "30vw" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <VisibilityOutlinedIcon
                      onClick={() => setShowPassword(false)}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={() => setShowPassword(true)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="Confirm Password"
            type={!showConfirmPassword ? "password" : ""}
            sx={{ width: "30vw" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showConfirmPassword ? (
                    <VisibilityOutlinedIcon
                      onClick={() => setShowConfirmPassword(false)}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={() => setShowConfirmPassword(true)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          {isValid.password && (
            <Error
              margin="5px 0"
              message={"Password and confirm password is not matched!"}
            />
          )}
          <CustomButton
            sx={{
              width: "96.5%",
              height: "3vh",
              fontSize: "20px",
              borderRadius: "5px",
            }}
            onClick={handleRgister}
          >
            Sing Up
          </CustomButton>
          {isFailed && (
            <Error styleProps={{ width: "30vw" }} message={message} />
          )}
          <Typography>
            Already a member? <Link to={"/login"}>Longin</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
