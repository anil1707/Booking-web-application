import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "75vw",
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
