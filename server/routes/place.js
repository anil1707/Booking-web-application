const express = require("express");
const {
  uploadByLinkController,
  uploadPhotoConroller,
  addPlaceController,
  updatePlaceController,
  getPlaceDataByIdController,
  deletePlaceController,
  getAllPlacesControllerByOwner,
  getAllPlaceController,
} = require("../controller/place");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

let placeRouter = express.Router();

placeRouter.post("/upload-by-link", uploadByLinkController);
placeRouter.post(
  "/upload-photo",
  uploadMiddleware.single("photos"),
  uploadPhotoConroller
);
placeRouter.post("/add", addPlaceController);
placeRouter.get("/all-place-owner", getAllPlacesControllerByOwner);
placeRouter.get("/all-place", getAllPlaceController);
placeRouter.put("/update", updatePlaceController);
placeRouter.get("/:id", getPlaceDataByIdController);
placeRouter.delete("/delete/:id", deletePlaceController);

module.exports = { placeRouter };
