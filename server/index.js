let express = require("express");
let app = express();
let connectDB = require("./db");
let cookieParser = require("cookie-parser");
const { userRoutes } = require("./routes/user");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { placeRouter } = require("./routes/place");
const { bookingRouter } = require("./routes/booking");
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(cors({ origin: "https://booking-website-app.netlify.app", credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
  console.log();
  res.send({ link: "http://localhost:5000/uploads" });
});

app.use("/user", userRoutes);
app.use("/place", placeRouter);
app.use('/booking', bookingRouter)




app.listen(PORT, (err) => {
  if (err) console.log("error: ", err);
  console.log(`server is running on http://localhost:${PORT}`);
});
