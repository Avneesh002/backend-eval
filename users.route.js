const express = require("express");
const { userModel } = require("./Models/user.model");
const mongoose = require("mongoose");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;

  try {
    const checkUser = await userModel.find({ email });
    if (checkUser.length > 0) {
      res.send({ msg: "User already exists" });
    } else {
      bcrypt.hash(password, 4, async (err, hash) => {
        const user = new userModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await user.save();

        res.send({ msg: "User successfully registered" });
      });
    }
  } catch (error) {
    res.send({ msg: "Error occurred while registering" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ user: user[0]._id }, "masai");
          res.send({ msg: "user successfully logged in", token });
        } else {
          res.send({ msg: "Your password is wrong" });
        }
      });
    } else {
      res.send({ msg: "You are not registered" });
    }
  } catch (error) {
    res.send({ msg: "Failed to login" });
  }
});

userRoute.get("/allusers", async (req, res) => {
  try {
    const user = await userModel.find();

    res.send(user);
  } catch (error) {
    res.send({ msg: "User not registered" });
  }
});

module.exports = { userRoute };
