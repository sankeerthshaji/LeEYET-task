require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")

// express app
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/",userRoutes);

// connect to db
mongoose.set("strictQuery", true);
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
