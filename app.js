const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

require("dotenv").config();

// import custom middlewares
const auth = require("./middlewares/auth");

// import Routers
const userRouter = require("./routers/userRouter");
const pageRouter = require("./routers/pageRouter");
const postRouter = require("./routers/postRouter");

// database connection
const connect = mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

connect.then(
  (db) => {
    console.log("connected to database");
  },
  (err) => console.log(err)
);

// Start up express app
const app = new express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("listening at port " + port);
});

app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDAPISECRET,
});

// Middlewares
app.use(formData.parse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: "up and running" });
});

// Routes
app.use("/users", userRouter);
app.use("/posts", auth.isAuthenticated, postRouter);
app.use("/pages", auth.isAuthenticated, pageRouter);

app.post("/image-upload", (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.path)
  );

  Promise.all(promises).then((results) => {
    res.json(results);
  });
});

app.post("/editorjs-image-upload", (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.path)
  );

  Promise.all(promises).then((results) => {
    res.json({
      success: 1,
      file: {
        url: results[0].url,
      },
    });
  });
});

// Error Handling

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
