const Users = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWTSECRET, async (err, data) => {
      if (err) return next(err);
      const user = await Users.findById(data);

      // clear out password data before attaching to request
      delete user.password;

      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};
