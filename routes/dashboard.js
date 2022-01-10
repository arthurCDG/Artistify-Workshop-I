var express = require("express");
var router = express.Router();
const artistModel = require("../models/Artist.model");
const uploader = require("../config/cloudinary/cloudinary.config");

router.get("/artists", (req, res, next) => {
  artistModel
    .find()
    .then((artists) => {
      res.render("dashboard/artists.hbs", { artists });
    })
    .catch((e) => console.error(e));
});

router.get("/createArtist", function (req, res, next) {
  res.render("dashboard/createArtist.hbs");
});

// router.post("/createArtist", async function (req, res, next) {
//   try {
//     await artistModel.create(req.body);
//     console.log("Ok post");
//     res.redirect("/dashboard/artists");
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/createArtist", uploader.single("picture"), (req, res, next) => {
  // artistModel
  // .create({
    // name: req.file.originalname,
    // URL: req.file.path,
  // })
  console.log("this is the req body ===== ", req.body);
  console.log("this is the req file path ===== ", req.file.path);
  const {description, name, isBand} = req.body;
  artistModel
    .create({description, name, isBand, picture: req.file.path})
    .then(res.redirect("/dashboard/artists"))
    .catch((err) => next(err));
});

router.get("/artists/delete/:id", function (req, res, next) {
  const id = req.params.id;
  artistModel
    .findByIdAndDelete(id)
    .then(res.redirect("/dashboard/artists"))
    .catch((error) => next(error));
});

router.get("/artists/update/:id", function (req, res, next) {
  console.log("update route");
  const id = req.params.id;
  artistModel
    .findById(id)
    .then((foundArtist) => {
      console.log(foundArtist)
      res.render("dashboard/artistUpdate.hbs", { artist: foundArtist });
    })
    .catch((error) => console.log(error));
});

router.post("/artists/update/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    console.log("This is the id >>>>>>>", id);
    console.log("This is the req.body >>>>>>>", req.body);
    await artistModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/dashboard/artists");
  } catch (err) {
    next(err);
  }
});

// picture reprensents the file input's name in the form view
router.post("/artists/upload-image", uploader.single("picture"), (req, res, next) => {
  console.log(req.file); // an object returned by multer/cloudinary containing usefull infos.
  artistModel
    .create({
      name: req.file.originalname,
      URL: req.file.path,
    })
    .then((success) => res.redirect("/dashboard/artists"))
    .catch(next);
});

module.exports = router;
