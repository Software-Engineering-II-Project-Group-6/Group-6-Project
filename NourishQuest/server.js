const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const app = express();
const PORT = 3000;

const uri =
  "mongodb+srv://nqadmin:p3tZCx9pi6E9LOiL@nqcluster.gup9z.mongodb.net/?retryWrites=true&w=majority&appName=NQCluster";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB (Atlas) connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "yourSecretKeyHere",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use("/auth", authRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
