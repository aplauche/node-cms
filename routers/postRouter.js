const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const Posts = require("../models/Post");

const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.user);
    const posts = await Posts.find({});
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(200).json({ status: "No Posts Found..." });
    }
  } catch (err) {
    next(err);
  }
});

postRouter.post("/", upload.uploadFeaturedImage, async (req, res, next) => {
  try {
    const newPost = await Posts.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
});

postRouter.put("/", (req, res, next) => {
  res.status(403).end("PUT not supported on this endpoint");
});

postRouter.delete("/", async (req, res, next) => {
  try {
    const result = await Posts.remove({});
    res.status(200).json({ status: result });
  } catch (err) {
    next(err);
  }
});

postRouter.get("/:postId");
postRouter.post("/:postId");
postRouter.put("/:postId");
postRouter.delete("/:postId");

module.exports = postRouter;
