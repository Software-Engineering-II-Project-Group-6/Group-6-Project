require("dotenv").config();
const express = require("express");
const exhandle = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs'); // for protected pages list
const { setupWebSocket } = require('./services/aiChatService');

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

// Handlebars templating engine
app.engine('handlebars', exhandle.engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// list of protected pages, for validation
var protectedList = fs.readdirSync(path.join(__dirname,'protected'));
protectedList.forEach((name,index) => { protectedList[index] = name.replace(".html","")});

// class to hold data passed to frontend using Handlebars' .render method
class contextBlock {
  pageTitle;          // the title to display in the
  contentList = [];

  constructor(req, title, layout) {
    this.pageTitle = title;

    if (layout) { // change layout from default
      this.layout = layout;
    }

    if (req.session?.userId) {
      this.loggedIn = true;
    }
  }

  

  // debug function to generate printable version of current context
  rawify() {
    this.raw = JSON.stringify(this,undefined,4);

    return this;
  }
}

// --------------------------
//         ROUTES
// --------------------------

// Home route -> public.html
app.get("/:homePath(home|index|index.html)?", (req, res) => {
  if (req.session?.userId) {
    return res.redirect("/dashboard");
  }

  return res.status(200).render('home', new contextBlock(req));
});

// Register page -> register.html
app.get("/register", (req, res) => {
  res.status(200).render('register', new contextBlock(req, 'Register'));
});

// Login page -> login.html
app.get("/login", (req, res) => {
  res.status(200).render('login', new contextBlock(req, 'Login'));
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

// universal GET for Protected Pages
app.get("/:protectedPage", requireLogin, (req, res, next) => {
  let pageName = req.params.protectedPage;
  if (!protectedList.includes(pageName)) {
    return next(); // if the page doesn't exist, forward this request to get caught by the 404 page
  }

  res.sendFile(path.join(__dirname, "protected", `${pageName}.html`));
});


// --------------------------
//      POST REQUESTS
// --------------------------

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

// routing for 404 error page
app.use((req, res) => {res.status(404).render('404', new contextBlock(req,'Page Not Found'))});

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

setupWebSocket(server);

module.exports = { app, server, dbConnection };
