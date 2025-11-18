require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // ✅ correct variable name
const usersRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// CORS setup (must come before routes)
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allow cookies
}));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Todolist")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/todo", todoRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
