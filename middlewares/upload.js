const multer = require("multer");
const uuid = require("uuid");

const multerOptions = {
  // configure disk storage for image uploads
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      // create unique filename and attach to request object
      const extension = file.mimetype.split("/")[1];
      req.body.featuredImage = `${uuid.v4()}.${extension}`;
      cb(null, req.body.featuredImage);
    },
  }),

  fileFilter: function (req, file, next) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      // first value is errors, second value is passed along
      next(null, true);
    } else {
      return next(new Error("You can only upload images"), false);
    }
  },
};

exports.uploadFeaturedImage = multer(multerOptions).single("featuredImage");
