require("dotenv").config();
const express = require("express");
const exhandle = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const cron = require("node-cron");

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);
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
    secret: process.env.SESSION_SECRET || "some-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.static(path.join(__dirname, "public")));

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

app.engine(
  "handlebars",
  exhandle.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const protectedList = fs
  .readdirSync(path.join(__dirname, "protected"))
  .map((f) => f.replace(".html", ""));

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

// Basic routes
app.get("/:homePath(home|index|index.html)?", (req, res) => {
  if (req.session?.userId) {
    return res.redirect("/dashboard");
  }
  return res.status(200).render("home", new contextBlock(req));
});

app.get("/register", (req, res) => {
  res.status(200).render("register", new contextBlock(req, "Register"));
});

app.get("/login", (req, res) => {
  res.status(200).render("login", new contextBlock(req, "Login"));
});

// GET /api/current-user => to fetch user macros, etc.
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
      gender: user.gender,
      dailyCalorieGoal: user.dailyCalorieGoal,
      macros: user.macros,
    });
  } catch (error) {
    console.error("Error in /api/current-user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// createplan.html
app.get("/createplan", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "createplan.html"));
});

// finalizeplan.html
app.get("/finalizeplan", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "protected", "finalizeplan.html"));
});

// TDEE (Mifflin–St Jeor)
function calculateTDEE(user, goal, activity) {
  const weightKg = user.weight * 0.45359237;

  // s offset
  const s = user.gender === "female" ? -161 : 5;

  // BMR in metric
  let bmr = 10 * weightKg + 6.25 * user.height - 5 * user.age + s;

  // activity factor
  let factor = 1.2;
  if (activity === "lightly") factor = 1.375;
  if (activity === "active") factor = 1.55;
  if (activity === "very") factor = 1.725;

  let tdee = bmr * factor;

  // goal adjustments: add or lose
  if (goal === "add") {
    tdee += 300;
  } else if (goal === "lose") {
    tdee -= 300;
  }

  return Math.round(tdee);
}

// POST /api/createplan => store daily cals/macros
app.post("/api/createplan", requireLogin, async (req, res) => {
  try {
    const { goal, activity, planLength } = req.body;
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const finalCals = calculateTDEE(user, goal, activity);
    const protein = Math.round((finalCals * 0.2) / 4);
    const fat = Math.round((finalCals * 0.25) / 9);
    const carbs = Math.round((finalCals * 0.55) / 4);

    user.dailyCalorieGoal = finalCals;
    user.macros.protein = protein;
    user.macros.fat = fat;
    user.macros.carbs = carbs;

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /api/createplan:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/finalizeplan > store weeklyMealPlan arrays
app.post("/api/finalizeplan", requireLogin, async (req, res) => {
  try {
    const { weeklyPlan } = req.body;
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.weeklyMealPlan = weeklyPlan;
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /api/finalizeplan:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Reset plan
app.post("/api/resetplan", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.weeklyMealPlan.monday.breakfast = [];
    user.weeklyMealPlan.monday.lunch = [];
    user.weeklyMealPlan.monday.dinner = [];

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error resetting plan:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/plan => day switching
app.get("/api/plan", requireLogin, async (req, res) => {
  try {
    const day = req.query.day?.toLowerCase() || "monday";
    const user = await User.findById(req.session.userId).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    const mealPlanForDay = user.weeklyMealPlan?.[day] || null;
    let hasMealPlan = false;
    if (mealPlanForDay) {
      const { breakfast, lunch, dinner } = mealPlanForDay;
      hasMealPlan =
        (breakfast && breakfast.length > 0) ||
        (lunch && lunch.length > 0) ||
        (dinner && dinner.length > 0);
    }

    const cartForDay = user.cart?.[day] || null;
    let hasCart = false;
    if (cartForDay) {
    }

    const consumptionForDay = user.dailyConsumption?.[day] || {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      water: 0,
    };

    return res.json({
      hasMealPlan,
      mealPlan: mealPlanForDay,
      hasCart,
      cart: cartForDay,
      consumption: {
        calories: consumptionForDay.calories || 0,
        protein: consumptionForDay.protein || 0,
        carbs: consumptionForDay.carbs || 0,
        fat: consumptionForDay.fat || 0,
        water: consumptionForDay.water || 0,
      },
      dailyCalorieGoal: user.dailyCalorieGoal,
      macros: user.macros,
      dailyWaterIntake: user.dailyWaterIntake,
    });
  } catch (err) {
    console.error("Error in /api/plan route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// /api/foods => USDA approach
app.get("/api/foods", requireLogin, async (req, res) => {
  try {
    const searchTerm = req.query.search || "chicken";
    const apiKey = "iczhr8o07TEMJ4NmmWZ7B5cPelqIp7mFUCtnvhg4";
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
      searchTerm
    )}&pageSize=10&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(500)
        .json({ error: `USDA request failed: ${response.status}` });
    }
    const data = await response.json();
    const foods = data.foods || [];
    const mapped = foods.map((f) => {
      let protein = 0,
        fat = 0,
        carbs = 0;
      if (f.foodNutrients) {
        for (const n of f.foodNutrients) {
          const name = n.nutrientName.toLowerCase();
          if (name.includes("protein")) protein = n.value || 0;
          else if (name.includes("fat")) fat = n.value || 0;
          else if (name.includes("carbohydrate")) carbs = n.value || 0;
        }
      }
      return {
        name: f.description || "No name",
        protein,
        fat,
        carbs,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/10366/10366416.png",
      };
    });
    return res.json(mapped);
  } catch (err) {
    console.error("Error in /api/foods route:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// universal GET for protected pages
app.get("/:protectedPage", requireLogin, (req, res, next) => {
  let pageName = req.params.protectedPage;
  if (!protectedList.includes(pageName)) {
    return next();
  }
  res.sendFile(path.join(__dirname, "protected", `${pageName}.html`));
});

// POST /register
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
  } catch (err) {
    console.error("Error in /register route:", err);
    return res.status(500).send("Internal server error");
  }
});

// POST /login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");
    req.session.userId = user._id;
    return res.redirect("/dashboard");
  } catch (err) {
    console.error("Error in /login route:", err);
    return res.status(500).send("Internal server error");
  }
});

// POST /logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error("Session destruction error:", err);
    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
});

// DASHBOARD //

//  Get the day name from the current date
function getTodayName() {
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayIndex = new Date().getDay();
  return dayNames[dayIndex];
}

// GET /api/dashboard => returns day plan + dailyConsumption
app.get("/api/dashboard", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const dayParam = (req.query.day || "").toLowerCase();
    const dayName = dayParam ? dayParam : getTodayName();

    const dailyWaterGoal = 64;

    const dayPlan = {
      breakfast: user.weeklyMealPlan?.[dayName]?.breakfast || [],
      lunch: user.weeklyMealPlan?.[dayName]?.lunch || [],
      dinner: user.weeklyMealPlan?.[dayName]?.dinner || [],
    };

    const consumptionForDay = user.dailyConsumption?.[dayName] || {};

    return res.json({
      dayPlan,
      dailyConsumption: consumptionForDay,
      dailyWaterGoal,
      dailyCalorieGoal: user.dailyCalorieGoal,
      macros: user.macros,
    });
  } catch (err) {
    console.error("Error in /api/dashboard:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/log-meal => mark a meal as completed & add macros
app.post("/api/log-meal", requireLogin, async (req, res) => {
  try {
    const { meal } = req.body; // "breakfast", "lunch", or "dinner"
    if (!meal) {
      return res.status(400).json({ error: "No meal specified" });
    }
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const day = getTodayName();

    // get array of items in that meal
    const mealItems = user.weeklyMealPlan?.[day]?.[meal] || [];
    // sum macros
    let totalCals = 0,
      totalProtein = 0,
      totalCarbs = 0,
      totalFat = 0;

    mealItems.forEach((item) => {
      totalCals += item.calorie || 0;
      totalProtein += item.protein || 0;
      totalCarbs += item.carb || 0;
      totalFat += item.fat || 0;
    });

    // add to dailyConsumption
    user.dailyConsumption[day].calories += totalCals;
    user.dailyConsumption[day].protein += totalProtein;
    user.dailyConsumption[day].carbs += totalCarbs;
    user.dailyConsumption[day].fat += totalFat;

    // set mealStatus
    if (!user.dailyConsumption[day].mealStatus) {
      user.dailyConsumption[day].mealStatus = {};
    }
    user.dailyConsumption[day].mealStatus[meal] = "completed";

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /api/log-meal:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/log-water => add water in ounces
app.post("/api/log-water", requireLogin, async (req, res) => {
  try {
    const { ounces } = req.body;
    if (!ounces) {
      return res.status(400).json({ error: "No ounces specified" });
    }
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const day = getTodayName();

    user.dailyConsumption[day].water += ounces;

    if (!user.dailyConsumption[day].waterLogs) {
      user.dailyConsumption[day].waterLogs = [];
    }

    const now = new Date();
    const hour = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const timeStr = `${hour12}:${minute} ${ampm}`;

    user.dailyConsumption[day].waterLogs.push({
      time: timeStr,
      ounces,
    });

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /api/log-water:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/finish-day => finalize the day
app.post("/api/finish-day", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const day = getTodayName();
    if (!user.dailyConsumption[day].mealStatus) {
      user.dailyConsumption[day].mealStatus = {};
    }
    ["breakfast", "lunch", "dinner"].forEach((meal) => {
      if (!user.dailyConsumption[day].mealStatus[meal]) {
        user.dailyConsumption[day].mealStatus[meal] = "completed";
      }
    });

    user.streak += 1; // INCREASE USER STREAK

    if (user.dailyConsumption[day]) {
      user.dailyConsumption[day].dayFinished = true;
    }

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error finishing day:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// 404
app.use((req, res) => {
  res.status(404).render("404", new contextBlock(req, "Page Not Found"));
});

// Daily reset
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily reset job...");

  try {
    const dayIndex = new Date().getDay();
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDay = dayNames[dayIndex];

    const allUsers = await User.find({});

    for (const user of allUsers) {
      if (user.dailyConsumption[currentDay]) {
        user.dailyConsumption[currentDay].calories = 0;
        user.dailyConsumption[currentDay].protein = 0;
        user.dailyConsumption[currentDay].carbs = 0;
        user.dailyConsumption[currentDay].fat = 0;
        user.dailyConsumption[currentDay].water = 0;

        if (Array.isArray(user.dailyConsumption[currentDay].waterLogs)) {
          user.dailyConsumption[currentDay].waterLogs = [];
        }
        if (!user.dailyConsumption[currentDay].mealStatus) {
          user.dailyConsumption[currentDay].mealStatus = {};
        }
        user.dailyConsumption[currentDay].mealStatus.breakfast = "notcompleted";
        user.dailyConsumption[currentDay].mealStatus.lunch = "notcompleted";
        user.dailyConsumption[currentDay].mealStatus.dinner = "notcompleted";
      }

      user.dailyConsumption[currentDay].dayFinished = false;
      await user.save();
    }

    console.log("Daily reset job completed successfully!");
  } catch (err) {
    console.error("Error in daily reset job:", err);
  }
});

let server;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, server, dbConnection };
