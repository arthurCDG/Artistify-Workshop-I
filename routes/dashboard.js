var express = require("express");
var router = express.Router();
const artistModel = require("../models/Artist.model");

router.get("/", (req, res, next) => {
  artistModel
    .find()
    .then((dbResponse) => {
      res.render("dashboard/artists.hbs", {
        artists: dbResponse,
      });
    })
    .catch((e) => console.error(e));
});

router.get("/createArtist", function (req, res, next) {
  res.render("dashboard/createArtist.hbs");
});

router.post("/createArtist", (res, req, next) => {
  artistModel
    .create(req.body)
    .then(res.redirect("/dashboard"))
    .catch((err) => next(err));
});

router.get("/update/:id", function (req, res, next) {
  id = req.params.id;
  artistModel
    .findById(id)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.render("artistUpdate.hbs", { dbResponse });
    })
    .catch((error) => next(error));
});

router.get("/delete/:id", function (req, res, next) {
  id = req.params.id;
  artistModel
    .findByIdAndDelete(id)
    .then(() => res.redirect("/dashboard/artists"))
    .catch((error) => next(error));
});

// router.post("/", async function (req, res, next) {
//   try {
//     await artistModel.create(req.body);
//     console.log("Ok post");
//     res.redirect("/dashboard/artists");
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/update/:id", async function (req, res, next) {
  try {
    id = req.params.id;
    await artistModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Ok update");
    res.redirect("/dashboard/artists");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
