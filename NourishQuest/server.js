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
const http = require("http");

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);
console.log(
  "OpenAI API Key:",
  process.env.OPENAI_API_KEY ? "Loaded" : "MISSING"
);

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

// Static files
app.use(express.static(path.join(__dirname, "NourishQuest", "public")));

// Simple login guard
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

app.get("/achievements", requireLogin, (req, res) => {
  res.sendFile(
    path.join(__dirname, "NourishQuest", "archived", "protected", "achievements.html")
  );
});

const ACHIEVEMENT_POINTS = {
  "67ca5a5b055f471527a03e73": 100,
  "67ca5a5b055f471527a03e74": 100,
  "67ca5a5b055f471527a03e75": 100,
  "67ca5a5b055f471527a03e76": 50,
  "67ca5a5b055f471527a03e79": 400,
  "67ca5a5b055f471527a03e7a": 350,
  "67ca5a5b055f471527a03e7b": 400,
  "67ca5a5b055f471527a03e7c": 800,
  "67ca5a5b055f471527a03e7d": 1200,
  "67ca5a5b055f471527a03e7e": 50,
  "67ca5a5b055f471527a03e7f": 2000,
  "67ca5a5b055f471527a03e80": 2500,
  "67ca5a5b055f471527a03e81": 2500,
  "67ca5a5b055f471527a03e82": 500,
};

const ACHIEVEMENTS = {
  "67ca5a5b055f471527a03e73": {
    points: 100,
    check: (user) => {
      // Suppose user must have consumed at least 80% of dailyCalorieGoal
      const day = getTodayName();
      const dayData = user.dailyConsumption?.[day] || {};
      if (!dayData.calories || !user.dailyCalorieGoal) return false;
      return dayData.calories >= user.dailyCalorieGoal * 0.8;
    },
  },

  "67ca5a5b055f471527a03e76": {
    points: 50,
    check: (user) => {
      // 8 glasses water => 64 oz
      const day = getTodayName();
      const dayData = user.dailyConsumption?.[day] || {};
      return (dayData.water || 0) >= 64;
    },
  },

  // Liam will add more...
};

// Handlebars view directory path
app.set('views', path.join(__dirname, 'NourishQuest', 'views'));

// Handlebars engine
app.engine(
  "handlebars",
  exhandle.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

class contextBlock {
  pageTitle;
  contentList = [];
  constructor(req, title) {
    this.pageTitle = title;
    if (req.session?.userId) {
      this.layout = "protected";
      this.userId = req.session.userId;
    }
  }
  rawify() {
    this.raw = JSON.stringify(this, undefined, 4);
    return this;
  }
}

// ===========================================
// BASIC ROUTES (USING HANDLEBARS TEMPLATES)
// ===========================================

// If user is not logged in, show home.handlebars; else go to dashboard
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

app.get("/nutrition-assistant", requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/login");
    }

    const context = new contextBlock(req, "Nutrition Assistant");
    context.userId = userId;

    return res.render("nutrition-assistant", context);
  } catch (err) {
    console.error("Error loading nutrition assistant:", err);
    res.status(500).send("Internal server error");
  }
});

const aiRoutes = require("./routes/AI_Routes.js");
app.use("/api/ai", aiRoutes);

// ===========================================
// UNIVERSAL ROUTE FOR .HTML FILES IN archived/protected
// ===========================================

app.get("/:protectedPage", requireLogin, (req, res, next) => {
  const pageName = req.params.protectedPage.toLowerCase();

  // Path to archived/protected/<pageName>.html
  const filePath = path.join(
    __dirname,
    "NourishQuest",
    "views",
    "protected",
    `${pageName}.handlebars`
  );

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Serve that HTML
    return res
      .status(200)
      .render(
        path.join("protected", pageName),
        new contextBlock(req, pageName)
      );
  } else {
    // Otherwise, continue to next route or 404
    return next();
  }
});

// ===========================================
// CURRENT USER API
// ===========================================
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

// TDEE function
function calculateTDEE(user, goal, activity) {
  const weightKg = user.weight * 0.45359237;
  const s = user.gender === "female" ? -161 : 5;
  let bmr = 10 * weightKg + 6.25 * user.height - 5 * user.age + s;

  let factor = 1.2;
  if (activity === "lightly") factor = 1.375;
  if (activity === "active") factor = 1.55;
  if (activity === "very") factor = 1.725;

  let tdee = bmr * factor;
  if (goal === "add") {
    tdee += 300;
  } else if (goal === "lose") {
    tdee -= 300;
  }
  return Math.round(tdee);
}

// ===========================================
// CREATE PLAN, FINALIZE PLAN, RESET PLAN
// ===========================================
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

// ===========================================
// GET /api/plan => Day Switching
// ===========================================
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

// ===========================================
// /api/foods => USDA approach
// ===========================================
app.get("/api/foods", requireLogin, async (req, res) => {
  try {
    const searchTerm = req.query.search || "chicken";
    const apiKey = "iczhr8o07TEMJ4NmmWZ7B5cPelqIp7mFUCtnvhg4";
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
      searchTerm
    )}&dataType=${encodeURIComponent(
      "Foundation"
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

// ===========================================
// RECIPES
// ===========================================
app.get("/api/recipes", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user.recipes || []);
  } catch (err) {
    console.error("Error in GET /api/recipes:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/recipes", requireLogin, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Please provide both title and description" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.recipes.push({ title, description });
    await user.save();

    const newRecipe = user.recipes[user.recipes.length - 1];
    return res.json(newRecipe);
  } catch (err) {
    console.error("Error in POST /api/recipes:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/recipes/:recipeId", requireLogin, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.recipes = user.recipes.filter(
      (recipe) => recipe._id.toString() !== recipeId
    );
    await user.save();

    return res.json({ success: true });
  } catch (err) {
    console.error("Error in DELETE /api/recipes/:recipeId:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ===========================================
// Leaderboard
// ===========================================
app.get("/api/leaderboard", requireLogin, async (req, res) => {
  try {
    const users = await User.find({}).sort({ points: -1 }).lean();

    let rankedUsers = users.map((user, index) => ({
      _id: user._id,
      username: user.username,
      points: user.points,
      rank: index + 1,
    }));

    const top20 = rankedUsers.slice(0, 20);

    const currentUserIndex = rankedUsers.findIndex(
      (u) => u._id.toString() === req.session.userId
    );
    if (currentUserIndex === -1) {
      return res.status(404).json({ error: "User not found in leaderboard" });
    }
    const currentUserRanked = rankedUsers[currentUserIndex];

    return res.json({
      top20,
      currentUser: {
        username: currentUserRanked.username,
        points: currentUserRanked.points,
        rank: currentUserRanked.rank,
      },
    });
  } catch (err) {
    console.error("Error in /api/leaderboard route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===========================================
// Profile updates
// ===========================================
app.post("/api/update-profile", requireLogin, async (req, res) => {
  try {
    const { age, height, weight } = req.body;
    if (!age || !height || !weight) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.age = Number(age);
    user.height = Number(height);
    user.weight = Number(weight);

    await user.save();
    return res.json({ success: true });
  } catch (error) {
    console.error("Error in /api/update-profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/change-password", requireLogin, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    // Hash & update new password
    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    console.error("Error in /api/change-password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/achievements/claim", requireLogin, async (req, res) => {
  try {
    const { achievementId } = req.body;
    if (!achievementId) {
      return res.status(400).json({ error: "No achievementId provided" });
    }

    const achievementObj = ACHIEVEMENTS[achievementId];
    if (!achievementObj) {
      return res.status(400).json({ error: "Invalid achievement ID" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Already claimed?
    if (user.claimedAchievements.includes(achievementId)) {
      return res.status(400).json({ error: "Achievement already claimed" });
    }

    // Check if user meets criteria
    if (!achievementObj.check(user)) {
      return res.status(400).json({
        error: "Criteria not met for this achievement",
      });
    }

    // Award points
    user.points += achievementObj.points;
    user.claimedAchievements.push(achievementId);
    await user.save();

    res.json({ success: true, newPoints: user.points });
  } catch (err) {
    console.error("Error in /api/achievements/claim:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===========================================
// Registration/Login
// ===========================================
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

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error("Session destruction error:", err);
    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
});

// ===========================================
// Dashboard logic
// ===========================================
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

app.post("/api/log-meal", requireLogin, async (req, res) => {
  try {
    const { meal } = req.body; // "breakfast", "lunch", or "dinner"
    if (!meal) {
      return res.status(400).json({ error: "No meal specified" });
    }
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const day = getTodayName();
    const mealItems = user.weeklyMealPlan?.[day]?.[meal] || [];
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

    user.dailyConsumption[day].calories += totalCals;
    user.dailyConsumption[day].protein += totalProtein;
    user.dailyConsumption[day].carbs += totalCarbs;
    user.dailyConsumption[day].fat += totalFat;

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

    user.streak += 1;
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

// ===========================================
// 404 + Cron daily reset
// ===========================================
app.use((req, res) => {
  res.status(404).render("404", new contextBlock(req, "Page Not Found"));
});

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

// let server;

// if (process.env.NODE_ENV !== "test") {
//   server = app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
