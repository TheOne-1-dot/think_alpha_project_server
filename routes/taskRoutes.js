const router = require('express').Router();
const Tasks = require('../controllers/tasks.controller');

// Get all tasks
router.get('/', Tasks.getAllTasks);

// Get a specific task by id
router.get('/:id', Tasks.getTask);

// Create a new task
router.post('/', Tasks.createTask);

// Update a task
router.put('/:id', Tasks.updateTask);

// Delete a task
router.delete('/:id', Tasks.deleteTask);

module.exports = router;