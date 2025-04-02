const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path if necessary
const packageJson = require('../package.json'); // path to package.json
const SeatReservation = require('../models/SeatReservation');

// Homepage Route
router.get('/', (req, res) => {
    res.render('landing_page', {
        isLandingPage: true,
        cssFile: "landing_page.css",
        title: "Lambda Lab Reservation"
    });
});

router.get('/home', (req, res) => {
    res.render('landing_page', {
        isLandingPage: true,
        cssFile: "landing_page.css",
        title: "Lambda Lab Reservation"
    });
});

// About Route
router.get('/about', (req, res) => {

    const teamMembers = [
        {
            name: "Nio Tujan",
            bio: "The classic \"I’ll do it later\" coder who somehow pulls off miracles at the last minute. Whether it's a machine learning model, a web app, or a random side project that nobody asked for, Nio thrives under pressure—mostly because that’s when he actually starts working. His desktop is a mess of folders labeled \"Final_Real_Final\" and \"FixThisLater,\" but despite the chaos, he always delivers. Loves problem-solving, hates unnecessary documentation, and will spend hours optimizing code that was already working fine."
        },
        {
            name: "Renz Tabuzo",
            bio: "If there’s a weird bug, Renz is the guy who somehow figures it out—usually after hours of trial and error (or just one lucky Stack Overflow post). He’s fascinated by cybersecurity, networking, and all things backend, but ironically, he’s also the one who gets locked out of his own accounts the most. Always up for a deep dive into ethical hacking or system security, but also somehow finds time to game. Prefers dark mode, thinks light mode users are \"built different,\" and has an endless list of unfinished projects."
        },
        {
            name: "Kelvin Alviar",
            bio: "The data and AI enthusiast of the group, Kelvin loves experimenting with machine learning models, even if they take hours to run. He’s the one who actually enjoys working with statistics and making sense of massive datasets while the rest of the group stares in confusion. Passionate about Python, skeptical about JavaScript, and will defend pandas and NumPy with his life. If he’s not coding, he’s probably reading up on AI trends or wondering why his model isn’t training properly."
        },
        {
            name: "Xander Diamante",
            bio: "The team’s UI/UX mastermind who refuses to let anything look ugly. While everyone else is focused on making things work, Xander is making sure they don’t look like they came from the early 2000s. Figma, Tailwind, and CSS animations are his playground, and he has a strong dislike for inline styles. Will spend hours adjusting margins and fonts but avoids backend work like the plague. If he's not designing, he’s either gaming, binging tutorials, or judging bad UI in random apps."
        }
    ];

    // Extract dependencies from package.json
    const dependencies = Object.entries(packageJson.dependencies).map(([name, version]) => ({
        name,
        version
    }));

    res.render('about', {
        cssFile: "about.css",
        title: "About Us",
        teamMembers,
        dependencies
    });
});

// Registration page (register.hbs)
router.get('/register', (req, res) => {
    res.render('register', {
        cssFile: "register.css",
        title: "Lambda Lab Registration"
    });
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login', {
        cssFile: "login.css",
        title: "Login Page",
        error: req.query.error
    });
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to log out.");
        }
        res.redirect('/login');
    });
});

// Reservation Route
router.get('/reservation', (req, res) => {
    res.render('reservation', {
        buildings: [
            { value: "Gokongwei", name: "Gokongwei" },
            { value: "Andrew", name: "Andrew" },
            { value: "St. La Salle", name: "St. La Salle" }
        ],
        rooms: [
            { value: "GK304A", name: "GK304A" },
            { value: "GK304B", name: "GK304B" },
            { value: "GK104", name: "GK104" },
        ],
        currentMonth: "February",
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        availableDates: [28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        times: [
            "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
            "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
            "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"
        ],
        selectedRoom: "GK104",
        selectedDate: "March 10, 2025",
        selectedTime: "7:30 PM",
        seatColumns: [
            [{ seatNumber: 1, status: "" }, { seatNumber: 2, status: "" }, { seatNumber: 3, status: "reserved" }, { seatNumber: 4, status: "" }, { seatNumber: 5, status: "" }, { seatNumber: 6, status: "" }, { seatNumber: 7, status: "" }, { seatNumber: 8, status: "" }, { seatNumber: 9, status: "" }, { seatNumber: 10, status: "" }, { seatNumber: 11, status: "" }, { seatNumber: 12, status: "" }, { seatNumber: 13, status: "" }, { seatNumber: 14, status: "" }, { seatNumber: 15, status: "" }, { seatNumber: 16, status: "" }, { seatNumber: 17, status: "" }, { seatNumber: 18, status: "" }],
            [{ seatNumber: 19, status: "" }, { seatNumber: 20, status: "" }, { seatNumber: 21, status: "" }, { seatNumber: 22, status: "" }, { seatNumber: 23, status: "" }, { seatNumber: 24, status: "" }, { seatNumber: 25, status: "" }, { seatNumber: 26, status: "" }, { seatNumber: 27, status: "" }, { seatNumber: 28, status: "" }, { seatNumber: 29, status: "" }, { seatNumber: 30, status: "" }, { seatNumber: 31, status: "" }, { seatNumber: 32, status: "" }, { seatNumber: 33, status: "" }, { seatNumber: 34, status: "" }, { seatNumber: 35, status: "" }, { seatNumber: 36, status: "" }],
            [{ seatNumber: 1, status: "" }, { seatNumber: 2, status: "" }, { seatNumber: 3, status: "" }, { seatNumber: 4, status: "" }, { seatNumber: 5, status: "" }, { seatNumber: 6, status: "" }, { seatNumber: 7, status: "" }, { seatNumber: 8, status: "" }, { seatNumber: 9, status: "" }, { seatNumber: 10, status: "" }, { seatNumber: 11, status: "" }, { seatNumber: 12, status: "" }, { seatNumber: 13, status: "" }, { seatNumber: 14, status: "" }, { seatNumber: 15, status: "" }, { seatNumber: 16, status: "" }, { seatNumber: 17, status: "" }, { seatNumber: 18, status: "" }],
            [{ seatNumber: 1, status: "" }, { seatNumber: 2, status: "" }, { seatNumber: 3, status: "" }, { seatNumber: 4, status: "" }, { seatNumber: 5, status: "" }, { seatNumber: 6, status: "" }, { seatNumber: 7, status: "" }, { seatNumber: 8, status: "" }, { seatNumber: 9, status: "" }, { seatNumber: 10, status: "" }, { seatNumber: 11, status: "" }, { seatNumber: 12, status: "" }, { seatNumber: 13, status: "" }, { seatNumber: 14, status: "" }, { seatNumber: 15, status: "" }, { seatNumber: 16, status: "" }, { seatNumber: 17, status: "" }, { seatNumber: 18, status: "" }]
        ],
        cssFile: "reservation.css"
    });
});

// Profile Route (GET)
router.get('/profile', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    try {
        const user = await User.findById(req.session.user.id).lean();
        const reservations = await SeatReservation.find({ user: user._id })
            .sort({ resDate: -1 })
            .lean();

        // Format dates properly
        const formattedReservations = reservations.map(r => ({
            seat: r.seat,
            venue: r.lab, // Match schema field name
            requestDate: new Date(r.reqDate).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
            }),
            reservationDate: new Date(r.resDate).toLocaleString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
                hour: 'numeric', minute: '2-digit', hour12: true
            })
        }));

        res.render('profile', {
            cssFile: "profile_styles.css",
            title: "Lambda Lab Profile",
            userName: `${user.firstname} ${user.lastname}`,
            bio: user.bio || "No bio yet",
            reservations: formattedReservations
        });
    } catch (error) {
        console.error("Profile Error:", error);
        res.redirect('/login');
    }
});

// Profile Edit Route (GET)
router.get('/profile_edit', async (req, res) => {
    const user = await User.findById(req.session.user.id).lean();

    if (!user) {
        return res.redirect('/profile'); // Redirect if user is not found
    }

    res.render('profile_edit', {
        cssFile: "profile_styles.css",
        title: "Lambda Lab Profile",
        user
    });
});

const teamMembers = [
    { name: "Nio Tujan", bio: "Pressure-driven coder, master of last-minute miracles." },
    { name: "Renz Tabuzo", bio: "Backend and cybersecurity enthusiast." },
    { name: "Kelvin Alviar", bio: "Data and AI enthusiast, loves working with massive datasets." },
    { name: "Xander Diamante", bio: "UI/UX designer who avoids ugly interfaces." }
];

// Search Results Page
router.get('/search', (req, res) => {

    const query = req.query.query.toLowerCase();

    // Filter members by matching the query with name or bio
    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query)
    );

    res.render('search_results', {
        cssFile: "search_styles.css",
        title: "Search Results Page",
        teamMembers: filteredMembers
    });
});


// Export the router to be used in app.js or other files
module.exports = router;
