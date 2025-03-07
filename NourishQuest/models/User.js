// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Hashed password
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  age: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "rather not say"],
    default: "rather not say",
  },

  goals: {
    type: String,
    default: "Maintain Weight",
  },
  allergies: {
    type: [String],
    default: [],
  },

  dailyCalorieGoal: {
    type: Number,
    default: 2000,
  },
  weeklyCalorieGoal: {
    type: Number,
    default: 14000,
  },

  macros: {
    protein: { type: Number, default: 50 },
    fat: { type: Number, default: 70 },
    carbs: { type: Number, default: 300 },
  },

  dailyWaterIntake: {
    type: Number,
    default: 64,
  },

  // Points from achievements
  points: {
    type: Number,
    default: 0,
  },

  // List of achievements unlocked
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }],

  // ---------------------------
  // CART
  // ---------------------------
  cart: {
    monday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
    tuesday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
    wednesday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
    thursday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
    friday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
    saturday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
    sunday: {
      breakfast: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      lunch: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
      dinner: {
        name: { type: String, default: "" },
        nutrition: {
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      },
    },
  },

  // ---------------------------
  // WEEKLY MEAL PLAN (arrays)
  // ---------------------------
  weeklyMealPlan: {
    monday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
    tuesday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
    wednesday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
    thursday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
    friday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
    saturday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
    sunday: {
      breakfast: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      lunch: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
      dinner: [
        {
          name: { type: String, default: "" },
          calorie: { type: Number, default: 0 },
          protein: { type: Number, default: 0 },
          carb: { type: Number, default: 0 },
          fat: { type: Number, default: 0 },
        },
      ],
    },
  },

  // ---------------------------
  // DAILY CONSUMPTION
  // ---------------------------
  dailyConsumption: {
    monday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String }, // "8:00 AM"
          ounces: { type: Number }, // e.g. 8 or 16
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
    tuesday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String },
          ounces: { type: Number },
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
    wednesday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String },
          ounces: { type: Number },
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
    thursday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String },
          ounces: { type: Number },
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
    friday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String },
          ounces: { type: Number },
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
    saturday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String },
          ounces: { type: Number },
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
    sunday: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      dayFinished: { type: Boolean, default: false },
      waterLogs: [
        {
          time: { type: String },
          ounces: { type: Number },
        },
      ],
      mealStatus: {
        breakfast: { type: String, default: "notcompleted" },
        lunch: { type: String, default: "notcompleted" },
        dinner: { type: String, default: "notcompleted" },
      },
    },
  },

  // Streak
  streak: {
    type: Number,
    default: 0,
  },

  // Potential recipes array
  recipes: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],

  chatMessages: [{
    role: { type: String, enum: ['user', 'assistant', 'system'] },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
