const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/artistify";

mongoose
  .connect(MONGO_URI)
  .then((db) => console.log(`Connected to the DB: ${db.connections[0].name}`))
  .catch((err) => console.error("Unable to connect to MongoDB", err));
