const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    houseName: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
});

// static login method
userSchema.statics.login = async function (userName, password) {
  if (!userName || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ userName });

  if (!user) {
    throw Error("Incorrect login credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect login credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
