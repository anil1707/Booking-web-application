import { Box, Typography } from "@mui/material";
import React from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TvIcon from "@mui/icons-material/Tv";
import PetsIcon from "@mui/icons-material/Pets";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import SpaIcon from "@mui/icons-material/Spa";

const Perks = ({ onChange, perk }) => {
  let labelStyle = {
    border: "1px solid gray",
    borderRadius: "6px",
    padding: "10px 15px 10px 5px",
    width: "200px",
    display: "flex",
    alignItems: "center",
    cursor:"pointer"
  };
  const handlePerks = (e) => {
    if (e.target.checked) {
      onChange([...perk, e.target.name]);
    } else {
      let filteredPerk = perk.filter((selectedName) => {
        return selectedName !== e.target.name;
      });
      onChange([...filteredPerk]);
    }
  };
  return (
    <Box sx={{ width: "75vw" }}>
      <Typography variant="h6">Perks</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "15vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <label style={labelStyle}>
            <input
              checked={perk.includes("wifi")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="wifi"
            />
            <WifiIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Wifi</span>
          </label>
          <label style={labelStyle}>
            <input
              checked={perk.includes("parking")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="parking"
            />
            <LocalParkingIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Free parking spot</span>
          </label>
          <label style={labelStyle}>
            <input
              checked={perk.includes("tv")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="tv"
            />
            <TvIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>TV</span>
          </label>
          <label style={labelStyle}>
            <input
              checked={perk.includes("pet")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="pet"
            />
            <PetsIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Pet</span>
          </label>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <label style={labelStyle}>
            <input
              checked={perk.includes("privateEntrance")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="privateEntrance"
            />
            <TrendingFlatIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Private Entrance</span>
          </label>
          <label style={labelStyle}>
            <input
              checked={perk.includes("breakfast")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="breakfast"
            />
            <BreakfastDiningIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Breakfast</span>
          </label>
          <label style={labelStyle}>
            <input
              checked={perk.includes("fitnessFacilities")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="fitnessFacilities"
            />
            <FitnessCenterIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Fitness Facilities</span>
          </label>
          <label style={labelStyle}>
            <input
              checked={perk.includes("swimmingPool")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="swimmingPool"
            />
            <PoolIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Swimming Pool</span>
          </label>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <label style={labelStyle}>
            <input
              checked={perk.includes("spaServices")}
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              onChange={handlePerks}
              name="spaServices"
            />
            <SpaIcon sx={{ margin: "0 10px 0 15px" }} />
            <span>Spa Services</span>
          </label>
        </Box>
      </Box>
    </Box>
  );
};

export default Perks;
