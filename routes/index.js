const express = require('express');
const bcrypt = require('bcryptjs'); // For hashing passwords
const router = express.Router();

// Homepage Route
router.get('/', (req, res) => {
    res.render('landing_page', { title: "Lambda Lab Reservation" });
});

// About Route
router.get('/about', (req, res) => {
    const teamMembers = [
        { name: "Nio Tujan", bio: "The classic \"I’ll do it later\" coder who somehow pulls off miracles at the last minute. Whether it's a machine learning model, a web app, or a random side project that nobody asked for, Nio thrives under pressure—mostly because that’s when he actually starts working. His desktop is a mess of folders labeled \"Final_Real_Final\" and \"FixThisLater,\" but despite the chaos, he always delivers. Loves problem-solving, hates unnecessary documentation, and will spend hours optimizing code that was already working fine." },
        { name: "Renz Tabuzo", bio: "If there’s a weird bug, Renz is the guy who somehow figures it out—usually after hours of trial and error (or just one lucky Stack Overflow post). He’s fascinated by cybersecurity, networking, and all things backend, but ironically, he’s also the one who gets locked out of his own accounts the most. Always up for a deep dive into ethical hacking or system security, but also somehow finds time to game. Prefers dark mode, thinks light mode users are \"built different,\" and has an endless list of unfinished projects." },
        { name: "Kelvin Alviar", bio: "The data and AI enthusiast of the group, Kelvin loves experimenting with machine learning models, even if they take hours to run. He’s the one who actually enjoys working with statistics and making sense of massive datasets while the rest of the group stares in confusion. Passionate about Python, skeptical about JavaScript, and will defend pandas and NumPy with his life. If he’s not coding, he’s probably reading up on AI trends or wondering why his model isn’t training properly." },
        { name: "Xander Diamante", bio: "The team’s UI/UX mastermind who refuses to let anything look ugly. While everyone else is focused on making things work, Xander is making sure they don’t look like they came from the early 2000s. Figma, Tailwind, and CSS animations are his playground, and he has a strong dislike for inline styles. Will spend hours adjusting margins and fonts but avoids backend work like the plague. If he's not designing, he’s either gaming, binging tutorials, or judging bad UI in random apps." }
    ];

    res.render('about', { title: 'About Us', teamMembers });
});

// Serve the registration page (register.hbs)
router.get('/register', (req, res) => {
    res.render('register', { title: 'Create an Account' });
});

// Handle the registration form submission
router.post('/register', (req, res) => {
    const { firstname, lastname, email, password, verifyPassword, classification } = req.body;

    // Basic validation to check if passwords match
    if (password !== verifyPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Hash the password before saving it (security measure)
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // For now, just log the registration details (replace with database logic in the future)
        console.log('Registration details:', { firstname, lastname, email, classification, hashedPassword });

        // Redirect to login page after successful registration
        res.redirect('/login');
    });
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Profile Route (GET)
router.get('/profile', (req, res) => {
    // Ensure user is logged in, or redirect to login if not
    if (!req.user) {
        return res.redirect('/login');
    }

    res.render('profile', {
        user: req.user, // Assuming user is stored in session or authenticated
        reservations: [
            { seat: "A01", venue: "GK101A", requestDate: "February 6, 2025 18:00:00", reservationDate: "February 7, 2025 07:00:00" },
            { seat: "A02", venue: "GK101B", requestDate: "February 6, 2025 19:00:00", reservationDate: "February 7, 2025 08:00:00" },
            { seat: "A03", venue: "GK102A", requestDate: "February 7, 2025 09:00:00", reservationDate: "February 8, 2025 10:00:00" }
        ]
    });
});

// Profile Edit Route (GET)
router.get('/profile/edit', (req, res) => {
    // Ensure user is logged in, or redirect to login if not
    if (!req.user) {
        return res.redirect('/login');
    }

    res.render('profile_edit', { user: req.user });
});

// Profile Update Route (POST)
router.post('/profile', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    const updatedBio = req.body.bio;
    // Update the user's bio in the database or session
    req.user.bio = updatedBio; // Update logic depends on how the user is stored (session/db)

    // Redirect to the updated profile
    res.redirect('/profile');
});

// Search Route
router.get('/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const teamMembers = [
        { name: "Nio Tujan", bio: "The classic \"I’ll do it later\" coder who somehow pulls off miracles at the last minute." },
        { name: "Renz Tabuzo", bio: "If there’s a weird bug, Renz is the guy who somehow figures it out." },
        { name: "Kelvin Alviar", bio: "The data and AI enthusiast of the group, Kelvin loves experimenting with machine learning models." },
        { name: "Xander Diamante", bio: "The team’s UI/UX mastermind who refuses to let anything look ugly." }
    ];

    // Filter team members based on the query
    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(query) || member.bio.toLowerCase().includes(query)
    );

    res.render('search_result', { title: 'Search Results', teamMembers: filteredMembers });
});

// Export the router to be used in app.js or other files
module.exports = router;
