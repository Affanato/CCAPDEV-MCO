const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Handle user registration
router.post('/', async (req, res) => {
    try {
        const { classification, firstname, lastname, email, password, verifyPassword } = req.body;
        // Check if passwords match
        if (password !== verifyPassword) {
            return res.status(400).send("Passwords do not match!");
        }
        // Create new user
        const newUser = new User({
            classification,
            firstname,
            lastname,
            email,
            password
        });
        // Save user to database
        await newUser.save();

        req.session.user = {
            id: newUser._id,
            name: `${firstname} ${lastname}`,
            email: newUser.email
        };

        // Redirect to profile with name as query parameter
        res.redirect(`/profile?name=${encodeURIComponent(firstname + ' ' + lastname)}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Set session upon successful login
        req.session.user = {
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email
        };

// Redirect to profile with name as query parameter
res.redirect(`/profile?name=${encodeURIComponent(user.firstname + ' ' + user.lastname)}`);
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});

module.exports = router;
