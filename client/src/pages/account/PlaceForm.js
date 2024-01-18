import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import BackupIcon from "@mui/icons-material/Backup";
import Perks from "../Perks";
import Account from "./Account";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const PlaceForm = ({ setIsAddNewPlace }) => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExteaInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
  });

  const getDataById = async (id) => {
    let response = await fetch("http://localhost:5000/place/" + id, {
      credentials: "include",
    });
    let result = await response.json();
    if (result) {
      setIsLoading(false);
    }
    console.log(result);
    setTitle(result.placeData.title);
    setAddress(result.placeData.address);
    setDescription(result.placeData.description);
    setPhoto(result.placeData.photos);
    setPerks(result.placeData.perks);
    setExteaInfo(result.placeData.extraInfo);
    setCheckin(result.placeData.checkIn);
    setCheckout(result.placeData.checkOut);
    setMaxGuests(result.placeData.maxGuests);
    setPrice(result.placeData.price)
  };
  const hanleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleUploadFile = async (e) => {
    let files = e.target.files;
    const data = new FormData();
    data.set("photos", files[0]);

    let response = await fetch("http://localhost:5000/place/upload-photo", {
      method: "post",
      body: data,
      credentials: "include",
    });

    let result = await response.json();
    setPhoto((prev) => {
      return [...prev, result.photo];
    });
  };

  const handlePhotoLink = (e) => {
    setPhotoLink(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleExtraInfo = (e) => {
    setExteaInfo(e.target.value);
  };

  const handleCheckIn = (e) => {
    setCheckin(e.target.value);
  };

  const handleCheckout = (e) => {
    setCheckout(e.target.value);
  };

  const handleMaxGuest = (e) => {
    setMaxGuests(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const addPhotoByLink = async () => {
    let response = await fetch("http://localhost:5000/place/upload-by-link", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ link: photoLink }),
    });

    let result = await response.json();
    setPhoto((prev) => {
      return [...prev, result];
    });
  };

  const handleSavePlace = async () => {
    if (id) {
      // update place
      console.log("update place detail");
    } else {
      let response = await fetch("http://localhost:5000/place/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          address,
          photo,
          description,
          perks,
          extraInfo,
          checkin,
          checkout,
          maxGuests,
          price,
        }),
        credentials: "include",
      });
      await response.json();
      setIsAddNewPlace(true);
    }
  };

  const handleCancel = () => {
    console.log("handle cancel is clicked");
    setIsAddNewPlace(true);
  };
  const handleDeletePlace = async () => {
    console.log("delete clicked");
    let response = await fetch("http://localhost:5000/place/delete/" + id, {
      method: "delete",
      credentials: "include",
    });
    let result = await response.json();
    if (result.message === "Deleted successfully!") {
      navigate("/account/accomodation");
    }
  };
  const handleUpdate = async () => {
    let placeData = {
      title,
      address,
      photo,
      description,
      perks,
      extraInfo,
      checkin,
      checkout,
      maxGuests,
    };
    let response = await fetch("http://localhost:5000/place/update", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...placeData }),
      credentials: "include",
    });
    let result = await response.json();
    if (result.message === "Updated successfully") {
      navigate("/account/accomodation");
    }
  };

  const handleDeletePhoto = (fileName) => {
    let filteredPhoto = photo.filter((item) => {
      return item !== fileName;
    });

    setPhoto([...filteredPhoto]);
  };

  const handleMainPhoto = (fileName) => {
    let filteredPhoto = photo.filter((item) => {
      return item !== fileName;
    });
    setPhoto([fileName, ...filteredPhoto]);
  };
  return (
    <>
      <Account isActive={"accomodation"} />
      <Box sx={{ width: "75vw", margin: "0 auto" }}>
        {id && (
          <Box
            sx={{
              width: "75vw",
              display: "flex",
              alignItems: "center",
              background: "#ecb3ff",
              borderRadius: "10px",
              margin: "20px 0",
            }}
          >
            <Typography variant="h5" sx={{ margin: "10px auto" }}>
              Edit place detail
            </Typography>
          </Box>
        )}
        <Box width={"75vw"}>
          <Typography variant="h6">Title</Typography>
          <Typography sx={{ color: "gray" }}>
            Title for your place should be short and catchy as in advertisement
          </Typography>
          <TextField
            size="small"
            placeholder="Title..."
            sx={{ width: "75vw", margin: "10px 0" }}
            value={title}
            onChange={hanleTitle}
          />
        </Box>
        <Box width={"75vw"}>
          <Typography variant="h6">Address</Typography>
          <Typography sx={{ color: "gray" }}>Address to this place</Typography>
          <TextField
            size="small"
            placeholder="Address..."
            sx={{ width: "75vw", margin: "10px 0" }}
            value={address}
            onChange={handleAddress}
          />
        </Box>
        <Box width={"75vw"}>
          <Typography variant="h6">Photos</Typography>
          <Typography sx={{ color: "gray" }}>more = better</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <TextField
              placeholder="Add photo using link..."
              size="small"
              sx={{ width: "90%" }}
              value={photoLink}
              onChange={handlePhotoLink}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "9%" }}
              onClick={addPhotoByLink}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 2fr)" }}>
            {photo &&
              photo.map((item, index) => {
                console.log(item);
                return (
                  <Box key={index} sx={{ position: "relative" }}>
                    <img
                      style={{
                        width: "14.3vw",
                        height: "18vh",
                        border: "1px solid gray",
                        borderRadius: "20px",
                        margin: "10px 0",
                        objectFit: "cover",
                        cursor: "pointer",
                        marginRight: "15px",
                      }}
                      src={`http://localhost:5000/uploads/${item}`}
                      alt={item}
                    />
                    {id && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "20px",
                          right: "20px",
                          zIndex: "2",
                          width: "35px",
                          height: "35px",
                          background: "black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          cursor: "pointer",
                          opacity: ".7",
                          ":hover": { opacity: "1" },
                        }}
                        onClick={() => handleDeletePhoto(item)}
                      >
                        <DeleteIcon sx={{ color: "white" }} />
                      </Box>
                    )}
                    {id && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "20px",
                          left: "5px",
                          width: "35px",
                          height: "35px",
                          background: "black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          cursor: "pointer",
                          opacity: ".7",
                          ":hover": { opacity: "1" },
                        }}
                        onClick={() => handleMainPhoto(item)}
                      >
                        {item === photo[0] && (
                          <StarIcon sx={{ color: "white" }} />
                        )}
                        {item !== photo[0] && (
                          <StarBorderIcon sx={{ color: "white" }} />
                        )}
                      </Box>
                    )}
                  </Box>
                );
              })}
            <label
              style={{
                width: "14.3vw",
                height: "18vh",
                border: "1px dashed gray",
                borderRadius: "20px",
                margin: "10px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TextField
                sx={{ display: "none" }}
                type="file"
                hidden
                onChange={handleUploadFile}
              />

              <BackupIcon sx={{ width: "7vw", height: "7vh" }} />
              <Typography variant="h4">Upload</Typography>
            </label>
          </Box>
        </Box>
        <Box width={"75vw"}>
          <Typography variant="h6">Description</Typography>
          <Typography color={"gray"}>Description of the place</Typography>
          <TextareaAutosize
            maxRows="7"
            minRows={"6"}
            style={{ width: "75vw", margin: "10px 0", padding:"10px", borderRadius:"5px" }}
            value={description}
            onChange={handleDescription}
          />
        </Box>
        <Perks onChange={setPerks} perk={perks} />
        <Box sx={{ margin: "35px 0 10px 0" }}>
          <Typography variant="h6">Extra Info</Typography>
          <Typography color={"gray"}>House rules, etc...</Typography>
          <TextareaAutosize
            maxRows="7"
            minRows={"6"}
            style={{ width: "75vw", margin: "10px 0", padding:"10px", borderRadius:"5px" }}
            onChange={handleExtraInfo}
            value={extraInfo}
          />
        </Box>
        <Box>
          <Typography variant="h6">Check in & out times</Typography>
          <Typography color={"gray"}>
            Add check in and check out time, remember to have some times for
            cleaing room and bet between guest
          </Typography>
          <Box
            sx={{
              margin: "10px 0",
              width: "70vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>Check in time</Typography>
              <TextField
                placeholder="14:00"
                size="small"
                onChange={handleCheckIn}
                value={checkin}
              />
            </Box>
            <Box>
              <Typography>Check out time</Typography>
              <TextField
                placeholder="11:00"
                size="small"
                onChange={handleCheckout}
                value={checkout}
              />
            </Box>
            <Box>
              <Typography>Max number of guests</Typography>
              <TextField
                type="number"
                placeholder="Ex: 2"
                size="small"
                onChange={handleMaxGuest}
                value={maxGuests}
              />
            </Box>
            <Box>
              <Typography>Price per night</Typography>
              <TextField
                type="number"
                placeholder="Ex: 32,990"
                size="small"
                onChange={handlePrice}
                value={price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "75vw",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "20px" }}
            onClick={id ? handleUpdate : handleSavePlace}
            fullWidth
          >
            {id ? "Update" : "Save"}
          </Button>
          {!id && (
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          {id && (
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleDeletePlace}
            >
              Delete
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PlaceForm;
