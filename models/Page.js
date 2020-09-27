const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugs = require("slugs");

const pageSchema = new Schema(
  {
    title: {
      type: String,
      required: "You must enter a title",
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

pageSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
    return;
  }
  // If name was modified set up the slug
  this.slug = slugs(this.title);
  next();
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
