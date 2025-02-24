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
  // Hashed password (bcrypt, etc.)
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
    default: 2000, //in ml
  },

  // Points from achievements
  points: {
    type: Number,
    default: 0,
  },

  // List of achievements unlocked
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }],

  // Cart
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

  // Weekly Meal Plan
  weeklyMealPlan: {
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

  recipes: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
