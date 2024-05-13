// routes/commentRoutes.js
const express = require("express");
const Comment = require("../models/Comment");
const Task = require("../models/Task");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Add a new comment to a task
router.post("/:taskId", authenticate, async (req, res) => {
  const { content } = req.body;
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const comment = new Comment({
      content,
      creator: req.user._id, // Extracted from JWT in the authenticate middleware
      task: taskId,
    });

    await comment.save();
    task.comments.push(comment);
    await task.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all comments for a specific task
router.get("/:taskId", authenticate, async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await Comment.find({ task: taskId }).populate("creator");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific comment
router.put("/:commentId", authenticate, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific comment
router.delete("/:commentId", authenticate, async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
