import { Box, Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const Error = ({ styleProps, message, marginTop, fontSize , marginBottom, margin}) => {
  console.log(message, marginTop);
  return (
    <Box
      sx={{
        color: "red",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        margin: "0 auto",
        marginTop:{marginTop},
        fontSize:{fontSize},
        marginBottom:{marginBottom},
        // margin:{margin}
      }}
      // marginTop= {`${marginTop}`}
      style={{...styleProps, margin:margin}}
    >
      <ErrorIcon sx={{ marginRight: "5px" }} />
      <Typography>{message}</Typography>
    </Box>
  );
};

export default Error;
