const express = require("express");
const router = express.Router();
const userSchema = require("../models/user.model.ts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Volunteer = require("../models/volunteer.model.js");

router.get("/register", function (req, res) {
  res.send("register");
});

router.post("/register", async function (req, res) {
  try {
    const { email, password, username } = req.body;
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = await userSchema.create({
      email,
      username,
      password: hashpassword,
    });

    res
      .status(200)
      .json({ message: "User registered successfully", user: newuser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

router.get("/verify", async function (req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { username, password } = req.body;

    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userID: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
});

router.get("/login", function (req, res) {
  res.send("login");
});

router.post("/Vollogin", async function (req, res) {
  try {
    const { username, password } = req.body;
    console.log(username);

    const volunte = await Volunteer.findOne({ name: username });

    if (!volunte) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    const ismatch = await bcrypt.compare(password, volunte.password);
    if (!ismatch) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }
    const token = jwt.sign(
      {
        userID: volunte._id,
        username: volunte.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });
    res
      .status(200)
      .json({ message: "Login successful", token, volunteer: volunte });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/profileDetails/:userID", async function (req, res) {
  try {
    const { userID } = req.params;
    const userdetails = await userSchema.findById(userID);

    if (!userdetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userdetails);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.put("/profile/:userID", async function (req, res) {
  try {
    const { userID } = req.params;
    const updates = req.body;

    const existingUser = await userSchema.findById(userID);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await userSchema.findByIdAndUpdate(userID, updates, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
