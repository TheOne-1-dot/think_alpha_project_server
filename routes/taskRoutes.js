// routes/taskRoutes.js
const express = require("express");
const Task = require("../models/Task");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Create a new task
router.post("/", authenticate, async (req, res) => {
  console.log(req.body);
  console.log(req.user);
  const { title, description, assignees, status } = req.body;
  try {
    const task = new Task({
      title,
      description,
      status,
      creator: req.user._id, // Extracted from JWT in the authenticate middleware
      assignees,
    });
    await task.save();
    await task.populate("creator assignees");
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all tasks for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate("creator") // Assuming 'username' is the field you want to display
      .populate("assignees");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific task
router.put("/:taskId", authenticate, async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, assignees } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        status,
        assignees,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific task
router.delete("/:taskId", authenticate, async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
