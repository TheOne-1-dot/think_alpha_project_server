
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Example: Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

module.exports = router;
