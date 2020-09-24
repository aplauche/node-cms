const mongoose = require("mongoose");
const express = require("express");
const upload = require("../middlewares/upload");

const Pages = require("../models/Page");

const pageRouter = express.Router();

pageRouter.get("/", async (req, res, next) => {
  try {
    const pages = await Pages.find({});
    if (pages.length > 0) {
      res.status(200).json(pages);
    } else {
      res.status(200).end("No Pages Found...");
    }
  } catch (err) {
    next(err);
  }
});
pageRouter.post("/", upload.uploadFeaturedImage, async (req, res, next) => {
  try {
    const newPage = await Pages.create(req.body);
    res.status(200).json(newPage);
  } catch (err) {
    next(err);
  }
});
pageRouter.put("/", (req, res) => {
  res.status(403).end("PUT not supported on this endpoint");
});
pageRouter.delete("/", async (req, res, next) => {
  try {
    const result = await Pages.remove({});
    res.status(200).json({ status: result });
  } catch (err) {
    next(err);
  }
});

pageRouter.get("/:pageId");
pageRouter.post("/:pageId");
pageRouter.put("/:pageId");
pageRouter.delete("/:pageId");

module.exports = pageRouter;
