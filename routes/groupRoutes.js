// routes/groupRoutes.js
const express = require("express");
const Group = require("../models/Group");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Create a new group
router.post("/", authenticate, async (req, res) => {
  const { name, description, members, tasks } = req.body;
  try {
    const group = new Group({
      name,
      description,
      members,
      creator: req.user._id,
      tasks, // include tasks in the creation
    });
    await group.save();
    await group.populate(["members", "tasks"]); // Optionally populate members and tasks upon creation
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all groups for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id })
      .populate({
        path: "members", // Populate members
        select: "name username",
      })
      .populate({
        path: "tasks", // Populate tasks
        populate: {
          path: "assignees", // Deep populate assignees within tasks
          select: "name username",
        },
      })
      .populate({
        path: "tasks",
        populate: {
          path: "creator", // Deep populate creator within tasks
          select: "name username",
        },
      });

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate({
        path: "members", // Populate members
        select: "name username",
      })
      .populate({
        path: "tasks", // Populate tasks
        populate: {
          path: "assignees", // Deep populate assignees within tasks
          select: "name username",
        },
      })
      .populate({
        path: "tasks",
        populate: {
          path: "creator", // Deep populate creator within tasks
          select: "name username",
        },
      });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific group
router.put("/:groupId", authenticate, async (req, res) => {
  const { groupId } = req.params;
  const { name, description, members, tasks } = req.body;
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { name, description, members, tasks },
      { new: true }
    ).populate(["members", "tasks"]); // Populate to ensure updated document details are returned
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific group
router.delete("/:groupId", authenticate, async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findByIdAndDelete(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
