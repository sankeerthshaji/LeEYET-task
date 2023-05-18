require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// express app
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connecting to db & listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongoose error!");
    console.log(err);
  });
