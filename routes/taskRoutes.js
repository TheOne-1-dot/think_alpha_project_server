const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');

// Get all task
router.get('/', async (req, res) => {
        try {
            const task = await Task.find();
            res.json(task);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

// Get a specific task by id
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        completed: req.body.completed,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        task.title = req.body.title;
        task.description = req.body.description;
        task.priority = req.body.priority;
        task.dueDate = req.body.dueDate;
        task.completed = req.body.completed;
    
        const updatedTask = await task.save();
        res.json(updatedTask);
      } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        await task.remove();
        res.json({ message: 'Task deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;