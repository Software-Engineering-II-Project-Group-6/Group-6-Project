require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");

// Load models
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});
dbConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true if your site is HTTPS
  })
);

app.use(express.static(path.join(__dirname, "public")));

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

// --------------------------
//         ROUTES
// --------------------------

// Home route -> public.html
app.get("/", (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect("/dashboard");
  }
  return res.sendFile(path.join(__dirname, "public", "public.html"));
});

// Register page -> register.html
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Login page -> login.html
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Dashboard -> dashboard.html
app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "dashboard.html"));
});

// Profile -> profile.html
app.get("/profile", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "profile.html"));
});

// Recipes -> recipes.html
app.get("/recipes", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "recipes.html"));
});

// Leaderboard -> leaderboard.html
app.get("/leaderboard", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "leaderboard.html"));
});

// Achievements -> achievements.html
app.get("/achievements", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "achievements.html"));
});

// Foods -> foods.html
app.get("/foods", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "foods.html"));
});

// Plan -> plan.html
app.get("/plan", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "plan.html"));
});

// Add recipe
app.get("/addrecipe", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "addrecipe.html"));
});

// Create plan
app.get("/createplan", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "createplan.html"));
});

// Finalize plan
app.get("/finalizeplan", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "finalizeplan.html"));
});

app.get("/api/current-user", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      username: user.username,
      email: user.email,
      age: user.age,
      height: user.height,
      weight: user.weight,
    });
  } catch (error) {
    console.error("Error in /api/current-user route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Registration (POST /register)
app.post("/register", async (req, res) => {
  try {
    const { email, username, password, age, height, weight, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send("User or email already exists!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user doc
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      age,
      height,
      weight,
      gender,
    });

    // Save user to database
    await newUser.save();

    // Redirect to login on success
    return res.redirect("/login");
  } catch (error) {
    console.error("Error in /register route:", error);
    return res.status(500).send("Internal server error");
  }
});

// Handle Login (POST /login)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    // Password is correct -> store userId in session
    req.session.userId = user._id;

    // Redirect to dashboard
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Error in /login route:", error);
    return res.status(500).send("Internal server error");
  }
});

// Handle Logout (POST /logout)
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
    }
    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
});

// --------------------------
//       START SERVER
// --------------------------
let server;
if (process.env.NODE_ENV !== "test") {
  //If not in testing environment or not using Jest
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, server, dbConnection };
