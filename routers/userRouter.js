const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const userRouter = express.Router();

const Users = require("../models/User");

// userRouter.get("/", async (req, res, next) => {
//   try {
//     const users = await Users.find({});
//     if (users.length > 0) {
//       res.status(200).json(users);
//     } else {
//       res.status(200).end("No Users Found...");
//     }
//   } catch (err) {
//     next(err);
//   }
// });

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = await Users.create(req.body);
    jwt.sign(newUser._id.toString(), process.env.JWTSECRET, (err, token) => {
      if (err) return next(err);
      res.status(200).json({
        message: "Authenticated!",
        token,
      });
    });
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    console.log(req.body.email);
    const user = await Users.findOne({ email: req.body.email });
    console.log(user);
    if (user == null) return next();
    const isAuth = await user.validatePassword(req.body.password);
    console.log(isAuth);
    if (!isAuth) {
      res.status(401).end("Incorrect Credentials");
    } else {
      jwt.sign(user._id.toString(), process.env.JWTSECRET, (err, token) => {
        if (err) return next(err);
        res.status(200).json({
          message: "Authenticated!",
          token,
        });
      });
    }
  } catch (err) {
    next(err);
  }
});

userRouter.get("/:userId", auth.isAuthenticated, async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.user.email });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
userRouter.put("/:userId", auth.isAuthenticated, async (req, res, next) => {
  try {
    const user = await Users.findOneAndUpdate(
      { email: req.user.email },
      req.body,
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// userRouter.delete("/:userId", async (req, res, next) => {
//   try {
//     const result = await Users.findByIdAndRemove(req.params.userId);
//     res.status(200).json({ status: result });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = userRouter;
