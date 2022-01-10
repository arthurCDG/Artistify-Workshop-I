var express = require("express");
var router = express.Router();
const artistModel = require("../models/Artist.model");

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

router.post("/createArtist", (req, res, next) => {
  console.log(req.body);
  artistModel
    .create(req.body)
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
  const id = req.params.id;
  artistModel
    .findById(id)
    .then((foundArtist) => {
      res.render("dashboard/artistUpdate.hbs", { artist: foundArtist });
    })
    .catch((error) => next(error));
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

module.exports = router;
