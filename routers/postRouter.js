const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const Posts = require("../models/Post");

const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.user);
    const posts = await Posts.find({}).populate("author");
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
    req.body.author = req.user._id;
    const newPost = await Posts.create(req.body).populate("author");
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

// Specific post routes

postRouter.get("/:postSlug", async (req, res, next) => {
  try {
    const post = await Posts.findOne({ slug: req.params.postSlug }).populate(
      "author"
    );
    if (post !== null) {
      res.status(200).json(post);
    } else {
      res.status(200).json({ status: "No Posts Found..." });
    }
  } catch (err) {
    next(err);
  }
});

postRouter.post("/:postSlug", async (req, res, next) => {
  res.status(403).end("PUT not supported on this endpoint");
});

postRouter.put(
  "/:postSlug",
  upload.uploadFeaturedImage,
  async (req, res, next) => {
    try {
      const post = await Posts.findOneAndUpdate(
        { slug: req.params.postSlug },
        req.body
      );
      const updatedPost = await Posts.findOne({
        slug: req.params.postSlug,
      }).populate("author");
      res.status(200).json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
);
postRouter.delete("/:postSlug", async (req, res, next) => {
  try {
    const result = await Posts.findOneAndDelete({ slug: req.params.postSlug });
    res.status(200).json({ status: "deleted", result });
  } catch (err) {
    next(err);
  }
});

module.exports = postRouter;
