let user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
dotenv.config();
const registerUser = async (req, res) => {
  let { userName, email, password, confirmPassword } = req.body;
  let exist = await user.findOne({ email: email });
  try {
    if (exist) {
      res.status(400).json({
        message: "User already exist, Please try with another email or login",
      });
    } else {
      if (userName && password && email && confirmPassword) {
        if (password === confirmPassword) {
          const bcryptedPassword = await bcrypt.hash(password, 10);
          password = bcryptedPassword;
          const collection = await user({ userName, email, password });
          let result = await collection.save();
          res.send({ message: "successfully registered", user: result });
        } else {
          res
            .status(400)
            .json({ message: "Password and confirm password is not mathced!" });
        }
      } else {
        res.json({ message: "Please fill all the field carefully!" });
      }
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Someting went wrong!", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let exist = await user.find({ email: email });
    let rightUser;
    if (exist.length === 0 && (email !== "" || password !== "")) {
      res.json({ message: "User doesn't exist, please register first!" });
    } else {
      if (email == "" || password == "") {
        res.json({ message: "Please fill all the filed carefully!" });
      } else {
        rightUser = await bcrypt.compare(password, exist[0].password);
        if (rightUser) {
          jwt.sign(
            { email, password: password },
            process.env.JWT_SECRET_KEY,
            {},
            (err, token) => {
              if (err) throw err;
              res
                .cookie("token", token)
                .json({ message: "Logged in successfully!" });
            }
          );
        } else {
          res.json({ message: "Email or Password is wrong!" });
        }
      }
    }
  } catch (error) {
    res.json({ message: "Something went wrong", error: error.message });
  }
};

let profileController = (req, res) => {
  try {
    let { token } = req.cookies;
    if (token)
      jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
        if (err) throw err;
        console.log(info.email);
        let userDoc = await user.findOne({ email: info.email });
        console.log(userDoc);
        res.json({ email: info.email, userName: userDoc.userName, id:userDoc._id });
      });
    else {
      res.send({ message: "failed to load" });
    }
  } catch (error) {
    res.json({ message: "Something went wrong", error: error.message });
  }
};

const logoutController = async (req, res) => {
  if (req.cookies) {
    res.cookie("token", "");
    res.json({ message: "Logged out successfully!" });
  }  else res.send({ message: "Not logged in" });
};

module.exports = {
  registerUser,
  loginUser,
  profileController,
  logoutController,
};
