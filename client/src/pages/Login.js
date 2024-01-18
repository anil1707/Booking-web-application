import { Box, TextField, InputAdornment, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Error from "./Error";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomButton from "./CustomButton";
import * as EmailValidator from "email-validator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState(false);
  const [message, setMessage] = useState("");
  let { user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState({ email: false });

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsFailed(false);
    setIsValid({ email: false });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setIsFailed(false);
  };

  const handleLogin = async () => {
    try {
      if (!EmailValidator.validate(email)) {
        setIsValid({ email: true });
        return;
      }
      let response = await fetch("http://localhost:5000/user/login", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      if (result.message === "Logged in successfully!") {
        navigate("/");
      } else {
        setIsFailed(true);
        setMessage(result.message);
      }
      console.log(result);
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
          marginTop: "20vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "30vh",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <Box>
            <TextField
              value={email}
              onChange={handleEmail}
              placeholder="Email"
              sx={{ width: "30vw" }}
              size=""
            />
            {isValid.email && (
              <Error message={"Please enter a valid email!"} margin={"5px 0"} />
            )}
          </Box>
          <TextField
            value={password}
            type={!showPassword ? "password" : ""}
            onChange={handlePassword}
            placeholder="Password"
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
          {isFailed && (
            <Error message={message} styleProps={{ width: "30vw"  }} />
          )}
          <CustomButton
            sx={{
              width: "96.5%",
              height: "3vh",
              fontSize: "20px",
              borderRadius: "5px",
            }}
            onClick={handleLogin}
          >
            Sing Up
          </CustomButton>

          <Typography>
            New user? <Link to={"/register"}>Register</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
