const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const postSignup = async (req, res) => {
  try {
    const values = JSON.parse(req.body.values);
    const hash = await bcrypt.hash(values.password, 10);
    const user = new User({
      ...values,
      password: hash,
      address: {
        houseName: values?.houseName,
        area: values?.area,
        landmark: values?.landmark,
        city: values?.city,
        state: values?.state,
        country: values?.country,
        pincode: values?.pincode,
      },
      image: {
        url: req?.file?.path,
        filename: req?.file?.filename,
      },
    });
    await user.save();
    res.status(200).json({ message: "Form submitted successfully" }); //send token
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
};

//loginUser
const loginUser = async (req, res) => {
  const { userName, password } = req.body; //destructuring req.body
  try {
    const user = await User.login(userName, password); //login user

    //create token
    const token = createToken(user._id);

    res.status(200).json({ token }); //send token
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
};

module.exports = {
  postSignup,
  loginUser
};
