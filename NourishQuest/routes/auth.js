const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/register", (req, res) => {
  res.send("Registration page (serve register.html or use a template engine).");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill out all fields." });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: "Username or Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
});

router.get("/profile-data", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Unauthorized. Please log in." });
  }
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill out all fields." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    res.json({ msg: "Login successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ msg: "Could not log out, try again." });
    }
    res.clearCookie("connect.sid");
    res.json({ msg: "Logout successful." });
  });
});

module.exports = router;
