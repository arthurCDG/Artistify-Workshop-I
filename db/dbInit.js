const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => console.log(`Connected to the DB: ${db.connections[0].name}`))
  .catch((err) => console.error("Unable to connect to MongoDB", err));
