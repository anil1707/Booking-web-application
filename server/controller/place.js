const download = require("image-downloader");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const place = require("../models/places");
dotenv.config();
const uploadByLinkController = async (req, res) => {
  const newName = "photo" + Date.now() + ".jpg";
  const options = {
    url: req.body.link,
    dest: path.dirname(__dirname) + "/uploads/" + newName,
  };
  download
    .image(options)
    .then(({ filename }) => {
    })
    .catch((err) => console.error("err", err));
  res.json(newName);
};

const uploadPhotoConroller = async (req, res) => {
  if (req.file) {
    let { originalname, path } = req.file;
    let parts = originalname.split(".");
    let ext = parts[parts.length - 1];
    let newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    res.send({
      photo: newPath.replace("uploads/", ""),
      message: "Uploaded successfully!",
    });
  } else {
    res.send({ message: "Upload fialed" });
  }
};

const addPlaceController = async (req, res) => {
  let {
    title,
    address,
    description,
    photo,
    extraInfo,
    checkout,
    checkin,
    maxGuests,
    perks,
    price
  } = req.body;
  let { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;
    const collection = await place({
      owner: info.email,
      title,
      address,
      description,
      photos: photo,
      checkIn: checkin,
      checkOut: checkout,
      extraInfo,
      perks,
      maxGuests,
      price
    });
    let result = await collection.save();
    res.json({ message: "Place added successfully!", data: result });
  });
};

const getAllPlacesControllerByOwner = async (req, res) => {
  let { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;
    let placeData = await place.find({ owner: info.email });
    res.json({ message: "Place added successfully!", data: placeData });
  });
};

const updatePlaceController = async (req, res) => {
  let {token} = req.cookies
  const {
    title,
    address,
    photo,
    description,
    extraInfo,
    checkin,
    checkout,
    maxGuests,
    id,
    perks,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;
    let placeDoc = await place.findById({_id:id})
    let result;
    if(placeDoc.owner === info.email)
    result = await place.updateOne(
      { _id: id },
      {
        $set: {
          title,
          address,
          description,
          checkIn: checkin,
          checkOut: checkout,
          maxGuests,
          photos: photo,
          extraInfo,
          perks,
        },
      }
    );
    res.send({ message: "Updated successfully", placeData: result });
  });
};

const getPlaceDataByIdController = async (req, res) => {
  let { id } = req.params;
  let placeData = await place.findById({ _id: id });
  res.send({ placeData });
};

const deletePlaceController = async (req, res) => {
  let { id } = req.params;
  let result = await place.deleteOne({ _id: id });
  res.send({ message: "Deleted successfully!", result });
};

// return all place irrespective of owner
const getAllPlaceController = async (req, res) =>{
  let placeData = await place.find()
  res.send({placeData})
}
module.exports = {
  uploadByLinkController,
  uploadPhotoConroller,
  addPlaceController,
  getAllPlacesControllerByOwner,
  updatePlaceController,
  getPlaceDataByIdController,
  deletePlaceController,
  getAllPlaceController
};
