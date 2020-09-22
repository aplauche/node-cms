const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validate = require("mongoose-validator");

const emailValidator = [
  validate({
    validator: "isEmail",
    message: "you must supply an email",
  }),
];
const passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [5, 50],
    message: "Your password must be between 5 and 50 characters",
  }),
];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: "You must enter an email",
      unique: true,
      trim: true,
      validate: emailValidator,
    },
    password: {
      type: String,
      required: true,
      validate: passwordValidator,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// BCRYPT
userSchema.pre("save", async function (next) {
  // skip if pw is not modified
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Check the password and return either true or false
userSchema.methods.validatePassword = async function (data) {
  return bcrypt.compare(data, this.password);
};

const Users = mongoose.model("User", userSchema);

module.exports = Users;
