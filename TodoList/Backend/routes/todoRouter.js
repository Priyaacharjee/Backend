const express = require('express');
const router = express.Router();
const TodoModel = require('../models/Todo');
const authMiddleware = require('../middlewares/authMiddleware')

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await TodoModel.find({ user: userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { done } = req.body; // ✅ get the new 'done' value from frontend

    // console.log("🔹 Update Request ID:", id);
    // console.log("🔹 User ID from token:", userId);

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: id, user: userId },
      { done }, // update done dynamically
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update todo" });
  }
});


router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedTodo = await TodoModel.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found or unauthorized" });

    res.json(deletedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { task } = req.body;

    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid user data" });
    }

    // basic validation
    if (!task || task.trim() === "") {
      return res.status(400).json({ message: "Task cannot be empty" });
    }

    const newTodo = await TodoModel.create({
      task,
      user: userId
    });

    console.log("✅ Todo created:", newTodo);

    return res.status(201).json({
      message: "Task created successfully",
      data: newTodo,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;