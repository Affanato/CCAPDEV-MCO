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

        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
