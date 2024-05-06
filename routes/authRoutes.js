const express = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/User');

const router = express.Router();

// Example: Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(13)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        // await User.create({ name, email, password: hashedPassword })
        res.json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// POST login
router.post('/login', async (req,res) => {
    const { email, password } = req.body;
    // if user exists, by looking for the email
    try {
        const user = await User.findOne({ email });
        //if true => check password
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            // if good password, sign JWT
            if (isMatch) {
                const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h'});
                res.json({ message: 'Login successful', token });
            // else incorrect password
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        // else no user with this email
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).json({ message: 'Login failed' })
    }
});
// Use the route-guard middleware
const routeGuard = (req, res, next) => {
    const token = req.headers.authorization?.split('')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Failed to authenticate token'});
    }
};
    

// GET Verify
router.get('/verify', routeGuard, (req, res) => {
    res.json({ message: 'Verified', user: req.user });
});

module.exports = router;
 