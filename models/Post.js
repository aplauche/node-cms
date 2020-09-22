const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("slugs");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: "You must enter a title",
      trim: true,
      unique: true,
    },
    content: {
      type: String,
    },
    featuredImage: {
      type: String,
    },
    metaTitle: String,
    metaDesc: String,
    slug: String,
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
    return;
  }
  // If name was modified set up the slug
  this.slug = slug(this.title);
  next();
});

var Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
