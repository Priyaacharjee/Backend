const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const { cloudinary } = require("../config/cloudinary");

module.exports.signUp = async function (req, res) {
    try {
        console.log("Signup request received:", req.body);

        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });

        if (user) return res.status(400).send("You already have an account, please login.");

        const hashPass = await bcrypt.hash(password, 10)
        let newuser = await userModel.create({
            email,
            password: hashPass,
            fullname
        });

        await newuser.save();

        let token = generateToken(newuser);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax", // allows localhost dev
            secure: false, // true only if HTTPS
        });

        res.status(201).json({ message: "User created successfully!", token });

    } catch (err) {
        console.log(err)
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Email or Password Incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email or Password Incorrect" });
        }

        let token = generateToken(user);

        // Set cookie correctly for cross-site (Render -> Vercel)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });

        return res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports.updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const imageUrl = req.file.path;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { picture: imageUrl },
            { new: true }
        );

        res.json({ success: true, picture: updatedUser.picture });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error updating profile picture" })
    }
}

module.exports.getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ success: true, user });
    } catch (err) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Logout failed" });
    }
};

