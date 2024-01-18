import { Box } from "@mui/material";
import React from "react";

const CustomButton = ({ text, customStyle, onClick, children, sx, width }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#ff6699",
        ":hover": { backgroundColor: "#cc0044" },
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 2px 4px gray",
        width: { width },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
      style={customStyle ? customStyle : sx}
    >
      {text ? text : children}
    </Box>
  );
};

export default CustomButton;
