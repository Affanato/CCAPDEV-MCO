const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

// Handle user registration
router.post('/register', async (req, res) => {
    try {
        const { classification, firstname, lastname, email, password, verifyPassword } = req.body;
        // Check if passwords match
        if (password !== verifyPassword) {
            return res.redirect('/register?error=' + encodeURIComponent('Passwords do not match!'));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = new User({
            classification,
            firstname,
            lastname,
            email,
            password: hashedPassword // Store the hashed password
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
        // Check if the error is due to duplicate email
        if (error.code === 11000) {
            return res.redirect('/register?error=' + encodeURIComponent('Email already exists!'));
        }
        res.redirect('/register?error=' + encodeURIComponent('An error occurred during registration.'));
    }
});

// Handle user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.redirect('/login?error=' + encodeURIComponent('Invalid email or password.'));
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.redirect('/login?error=' + encodeURIComponent('Invalid email or password.'));
        }

        // Set session upon successful login
        req.session.user = {
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            bio: user.bio
        };

        // Redirect to profile with name as query parameter
        res.redirect(`/profile?name=${encodeURIComponent(user.firstname + ' ' + user.lastname)}`);
    } catch (error) {
        console.error("Login Error:", error);
        res.redirect('/login?error=' + encodeURIComponent('An error occurred. Please try again.'));
    }
});

// Handle profile bio update
router.post('/profile', async (req, res) => {
    try {
        const { bio } = req.body;

        // Update the user's bio in the database
        const user = await User.findByIdAndUpdate(req.session.user.id, { bio }, { new: true });

        // Update the session with the new bio
        req.session.user.bio = user.bio;

        // Redirect back to the profile page
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.redirect('/profile?error=' + encodeURIComponent('An error occurred while updating the profile.'));
    }
});

// Search users
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.render('search_result', {
                cssFile: "search_styles.css",
                title: "Search Results",
                teamMembers: []
            });
        }

        // Search for users by name or email
        const users = await User.find({
            $or: [
                { firstname: { $regex: query, $options: 'i' } },
                { lastname: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('firstname lastname email bio classification');

        // Transform users into teamMembers format
        const teamMembers = users.map(user => ({
            name: `${user.firstname} ${user.lastname}`,
            bio: user.bio || 'No bio available',
            email: user.email,
            classification: user.classification
        }));

        res.render('search_result', {
            cssFile: "search_styles.css",
            title: "Search Results",
            teamMembers
        });
    } catch (error) {
        console.error("Search Error:", error);
        res.render('search_result', {
            cssFile: "search_styles.css",
            title: "Search Results",
            teamMembers: [],
            error: 'An error occurred during search'
        });
    }
});

module.exports = router;
