const express = require('express');
const router = express.Router();
const { upload } = require("../config/cloudinary");
const verifyToken= require("../middlewares/authMiddleware")
const {signUp,loginUser,updateProfilePicture,getCurrentUser,logoutUser} = require('../controllers/AuthController');


router.get("/", function (req, res) {
    res.send("hey its user");
})

router.post("/signup",signUp);

router.post("/login",loginUser);

router.post("/update-picture",verifyToken,upload.single("picture"),updateProfilePicture);

router.get("/me", verifyToken, getCurrentUser);

router.get("/logout",logoutUser);

module.exports = router;
