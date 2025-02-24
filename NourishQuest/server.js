require("dotenv").config();
const express = require("express");
const exhandle = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs"); // for protected pages list

// Load models
const User = require("./models/User");

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});
dbConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "some-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.static(path.join(__dirname, "public")));

// ensure user is logged in
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

// Handlebars templating engine
app.engine(
  "handlebars",
  exhandle.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// list of protected pages, for validation
const protectedList = fs
  .readdirSync(path.join(__dirname, "protected"))
  .map((name, index) => name.replace(".html", ""));

// class to hold data passed to frontend using Handlebars' .render method
class contextBlock {
  pageTitle;
  contentList = [];

  constructor(req, title, layout) {
    this.pageTitle = title;
    if (layout) {
      this.layout = layout;
    }
    if (req.session?.userId) {
      this.loggedIn = true;
    }
  }

  rawify() {
    this.raw = JSON.stringify(this, undefined, 4);
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
  return res.status(200).render("home", new contextBlock(req));
});

// Register page -> register.html
app.get("/register", (req, res) => {
  res.status(200).render("register", new contextBlock(req, "Register"));
});

// Login page -> login.html
app.get("/login", (req, res) => {
  res.status(200).render("login", new contextBlock(req, "Login"));
});

// Return current user data as JSON
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

// /api/foods route
app.get("/api/foods", requireLogin, async (req, res) => {
  try {
    const searchTerm = req.query.search || "chicken";
    const pageSize = req.query.page_size || "10";
    const filter = req.query.filter || "all";
    const results = await fetchUSDAFoods(searchTerm, pageSize, filter);
    return res.json(results);
  } catch (error) {
    console.error("Final error in /api/foods route:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

async function fetchUSDAFoods(query, pageSize, filter) {
  const apiKey = "iczhr8o07TEMJ4NmmWZ7B5cPelqIp7mFUCtnvhg4";
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
    query
  )}&pageSize=${pageSize}&api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`USDA request failed with status ${response.status}`);
  }
  const data = await response.json();
  let foods = data.foods || [];
  if (filter !== "all") {
    foods = foods.filter((f) => {
      const desc = f.description ? f.description.toLowerCase() : "";
      switch (filter) {
        case "vegetarian":
          return desc.includes("vegetarian");
        case "vegan":
          return desc.includes("vegan");
        case "glutenfree":
          return desc.includes("gluten-free") || desc.includes("gluten free");
        case "lowcarb":
          return desc.includes("low carb") || desc.includes("lowcarb");
        default:
          return true;
      }
    });
  }
  return foods.map((f) => {
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    if (f.foodNutrients) {
      for (const n of f.foodNutrients) {
        const name = n.nutrientName.toLowerCase();
        if (name.includes("protein")) {
          protein = n.value || 0;
        } else if (name.includes("fat")) {
          fat = n.value || 0;
        } else if (name.includes("carbohydrate")) {
          carbs = n.value || 0;
        }
      }
    }
    return {
      name: f.description || "No name",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/10366/10366416.png",
      protein,
      fat,
      carbs,
    };
  });
}

// universal GET for Protected Pages
app.get("/:protectedPage", requireLogin, (req, res, next) => {
  let pageName = req.params.protectedPage;
  if (!protectedList.includes(pageName)) {
    return next();
  }
  res.sendFile(path.join(__dirname, "protected", `${pageName}.html`));
});

// Registration (POST /register)
app.post("/register", async (req, res) => {
  try {
    const { email, username, password, age, height, weight, gender } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send("User or email already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      age,
      height,
      weight,
      gender,
    });
    await newUser.save();
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }
    req.session.userId = user._id;
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
app.use((req, res) => {
  res.status(404).render("404", new contextBlock(req, "Page Not Found"));
});

// --------------------------
//       START SERVER
// --------------------------
let server;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, server, dbConnection };
