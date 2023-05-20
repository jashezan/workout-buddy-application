const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.MONGO_URI;

// API
const workRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.redirect("/api/workouts");
});

mongoose
  .connect(DB_CONNECTION)
  .then(
    app.listen(PORT, (er) => {
      if (er) {
        console.log(er);
      } else {
        console.log(`Connected to DB and Server Running on port: ${PORT}`);
      }
    })
  )
  .catch((er) => {
    console.log(er);
  });
