require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");



// Middleware setup
app.use(cookieParser());
app.use(express.json());

// CORS setup (must come before routes)
app.use(cors({
  origin: "https://todolist-tan-delta-83.vercel.app", // frontend URL
  credentials: true, // allow cookies
}));

// MongoDB connection
const mongodb = process.env.MONGODB_URI;
mongoose.connect(mongodb, {
    dbName: "todolist",
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));


// Routes
app.use("/todo", todoRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
