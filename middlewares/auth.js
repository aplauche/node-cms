const Users = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (apiKey == process.env.APIKEY && req.method == "GET") {
      next();
    } else {
      if (!req.headers.authorization) {
        res
          .status(401)
          .send("You are not authorized to complete that operation");
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWTSECRET, async (err, data) => {
        if (err)
          res
            .status(401)
            .send("You are not authorized to complete that operation");
        const user = await Users.findById(data);

        // clear out password data before attaching to request
        delete user.password;

        req.user = user;
        next();
      });
    }
  } catch (err) {
    next(err);
  }
};
