const express = require("express");
const { postSignup, loginUser } = require("../controllers/userController");
const multer = require("multer");
const { storage } = require("../cloudinary/");
const  validate  = require("../middlewares/validations/userSchema");
const upload = multer({ storage });
const router = express.Router();

router.post("/signup", upload.single("image"), validate, postSignup);

router.post("/login", loginUser);

module.exports = router;
