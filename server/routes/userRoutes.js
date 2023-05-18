const express = require("express");
const { postSignup, loginUser, getUserDetails, updateProfile } = require("../controllers/userController");
const multer = require("multer");
const { storage } = require("../cloudinary/");
const validate = require("../middlewares/validations/userSchema");
const requireAuthUser = require("../middlewares/authorization");
const updateProfileValidation = require("../middlewares/validations/editProfileSchema");
const upload = multer({ storage });
const router = express.Router();

router.post("/signup", upload.single("image"), validate, postSignup);

router.post("/login", loginUser);

router.get("/profile", requireAuthUser, getUserDetails);

router.patch("/updateProfile", requireAuthUser, upload.single("image"), updateProfileValidation, updateProfile)

module.exports = router;
