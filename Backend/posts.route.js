const express = require("express");
const { postModel } = require("./Models/post.model");
const mongoose = require("mongoose");
const postRoute = express.Router();
const { authentication } = require("./middleware/authentication.middleware");

postRoute.get("/", authentication, async (req, res) => {
  const userId = req.body.user;

  try {
    const userData = await postModel.find({ user: userId });
    if (userData.length > 0) {
      res.send(userData);
    } else {
      res.send({ msg: "User has no posts" });
    }
  } catch (error) {
    res.send({ msg: "Fetching error" });
  }
});

postRoute.get("/allposts", async (req, res) => {
  try {
    const allFiles = await postModel.find();
    res.send(allFiles);
  } catch (error) {
    res.send({ msg: "Fetching error" });
  }
});

postRoute.post("/addpost", async (req, res) => {
  const payload = req.body;
  console.log(payload);

  try {
    const postData = new postModel(payload);
    await postData.save();
    res.send({ msg: "Posted successfully" });
  } catch (error) {
    res.send({ msg: "Not able to post, try again later" });
  }
});

postRoute.patch("/update/:id", authentication, async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const patchData = await postModel.findOne({ _id: id });

  try {
    if (patchData.user === payload.user) {
      await postModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "updated successfully" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: "Not able to update, try again later" });
  }
});

postRoute.delete("/delete/:id", authentication, async (req, res) => {
  const id = req.params.id;
  const deleteData = await postModel.findOne({ _id: id });
  if (!deleteData) {
    res.send({ msg: "Post is not available" });
  } else {
    try {
      if (deleteData.user === req.body.user) {
        await postModel.findByIdAndDelete({ _id: id });
        res.send({ msg: "deleted successfully" });
      } else {
        res.send({ msg: "You are not authorized" });
      }
    } catch (error) {
      res.send({ msg: "Not able to update, try again later" });
    }
  }
});

module.exports = { postRoute };
