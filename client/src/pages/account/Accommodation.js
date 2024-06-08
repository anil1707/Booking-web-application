import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Account from "./Account";
import PlaceForm from "./PlaceForm";
import Loading from "../Loading";
import AddIcon from '@mui/icons-material/Add';
let baseUrl = "http://localhost:5000"
const Accommodation = () => {
  const [isAddNewPlace, setIsAddNewPlace] = useState(true);
  const [place, setPlace] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [isAddNewPlace]);

  const getData = async () => {
    let response = await fetch(baseUrl+"/place/all-place-owner", {
      method: "get",
      credentials: "include",
    });

    let result = await response.json();
    setPlace(result.data);
  };

  const handleUpdate = (id) => {
    navigate("/account/accomodation/" + id);
  };
  const handleNewPlace = () => {
    setIsAddNewPlace(false);
  };

  if (!isAddNewPlace) return <PlaceForm setIsAddNewPlace={setIsAddNewPlace} />;

  if (isAddNewPlace) {
    return (
      <Box>
        <Box>
          <Account isActive={"accomodation"} />
          {place.length === 0 && (
           <Loading/>
          )}

          {place.length > 0 && (
            <Box>
              <Box
                sx={{
                  width: "90vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5vh auto",
                }}
              >
                <Button variant="contained" color="secondary" onClick={handleNewPlace}>
                  <AddIcon/> Add new place
                </Button>
              </Box>
              {place?.length > 0 &&
                place.map((item, index) => {
                  return (
                    <Paper
                      key={index}
                      sx={{
                        width: "75vw",
                        height: "24vh",
                        margin: "30px auto",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        background: "#f2f2f2",

                        borderRadius: "20px",
                        cursor: "pointer",
                        display: "flex",
                        padding: "10px",
                      }}
                      onClick={() => handleUpdate(item._id)}
                    >
                      {item.photos?.length > 0 && (
                        <img
                          src={
                            "http://localhost:5000/uploads/" + item.photos[0]
                          }
                          alt={item.photos[0]}
                          style={{
                            width: "200px",
                            height: "225px",
                            background: "red",
                            borderRadius: "20px",
                            marginRight: "20px",
                            flexGrow: "0",
                            flexShrink: "0",
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "wrap",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        <Typography variant="h4">{item.title}</Typography>
                        <Typography sx={{ margin: "10px 0" }}>
                          {item.description}
                        </Typography>
                        <Typography>{item.extraInfo}</Typography>
                      </Box>
                    </Paper>
                  );
                })}
            </Box>
          )}
        </Box>
      </Box>
    );
  }
};

export default Accommodation;
