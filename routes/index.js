const express = require('express');
const router = express.Router();

// Homepage Route
router.get('/', (req, res) => {
    res.render('landing_page',{
        isLandingPage: true,
        cssFile: "landing_page.css",
        title: "Lambda Lab Reservation"
    });
});

router.get('/home', (req, res) => {
    res.render('landing_page',{
        isLandingPage: true, 
        cssFile:"landing_page.css",
        title: "Lambda Lab Reservation"
    });
});

// About Route
router.get('/about', (req, res) => {
    res.render('about', {
        cssFile: "about.css", 
        title: "About Us"
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
        title: "Login Page"
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
            { value: "goks", name: "Gokongwei" },
            { value: "andrew", name: "Andrew" },
            { value: "st_la_salle", name: "St. La Salle" }
        ],
        rooms: [
            { value: "GK104", name: "GK104" },
            { value: "GK103", name: "GK103" },
        ],
        currentMonth: "February",
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        availableDates: [28, 29, 30, 31, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,1,2,3,4,5,6,7,8,9,10],
        times: [
            "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
            "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
            "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"
        ],
        selectedRoom: "GK101A",
        selectedDate: "February 6, 2025",
        selectedTime: "6:00 PM",
        seatColumns: [
            [{ seatNumber: 1, status: "" }, { seatNumber: 2, status: "" }, { seatNumber: 3, status: "reserved" }, { seatNumber: 4, status: "" }, { seatNumber: 5, status: "" }, { seatNumber: 6, status: "" }, { seatNumber: 7, status: "" }, { seatNumber:8, status: "" }, { seatNumber: 9, status: "" }, { seatNumber: 10, status: "" }, { seatNumber: 11, status: "" }, { seatNumber: 12, status: "" }, { seatNumber: 13, status: "" }, { seatNumber: 14, status: "" }, { seatNumber: 15, status: "" }, { seatNumber: 16, status: "" }, { seatNumber: 17, status: "" }, { seatNumber: 18, status: "" }],
            [{ seatNumber: 19, status: "" }, { seatNumber: 20, status: "" }, { seatNumber: 21, status: "" }, { seatNumber: 22, status: "selected" }, { seatNumber: 23, status: "selected" }, { seatNumber: 24, status: "" }, { seatNumber: 25, status: "" }, { seatNumber: 26, status: "" }, { seatNumber: 27, status: "" }, { seatNumber: 28, status: "" }, { seatNumber: 29, status: "" }, { seatNumber: 30, status: "" }, { seatNumber: 31, status: "" }, { seatNumber: 32, status: "" }, { seatNumber: 33, status: "" }, { seatNumber: 34, status: "" }, { seatNumber: 35, status: "" }, { seatNumber: 36, status: "" }],
            [{ seatNumber: 1, status: "" }, { seatNumber: 2, status: "" }, { seatNumber: 3, status: "" }, { seatNumber: 4, status: "" }, { seatNumber: 5, status: "" }, { seatNumber: 6, status: "" }, { seatNumber: 7, status: "" }, { seatNumber:8, status: "" }, { seatNumber: 9, status: "" }, { seatNumber: 10, status: "" }, { seatNumber: 11, status: "" }, { seatNumber: 12, status: "" }, { seatNumber: 13, status: "" }, { seatNumber: 14, status: "" }, { seatNumber: 15, status: "" }, { seatNumber: 16, status: "" }, { seatNumber: 17, status: "" }, { seatNumber: 18, status: "" }],
            [{ seatNumber: 1, status: "" }, { seatNumber: 2, status: "" }, { seatNumber: 3, status: "" }, { seatNumber: 4, status: "" }, { seatNumber: 5, status: "" }, { seatNumber: 6, status: "" }, { seatNumber: 7, status: "" }, { seatNumber:8, status: "" }, { seatNumber: 9, status: "" }, { seatNumber: 10, status: "" }, { seatNumber: 11, status: "" }, { seatNumber: 12, status: "" }, { seatNumber: 13, status: "" }, { seatNumber: 14, status: "" }, { seatNumber: 15, status: "" }, { seatNumber: 16, status: "" }, { seatNumber: 17, status: "" }, { seatNumber: 18, status: "" }]
        ],
        cssFile : "reservation.css"
    });
});

// Profile Route (GET)
router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('profile', {
        cssFile: "profile_styles.css",  
        title: "Lambda Lab Profile",
        userName: req.session.user.name || req.query.name
    });
});

// Profile Edit Route (GET)
router.get('/profile/edit', (req, res) => {
    res.render('profile_edit', {
        cssFile: "profile_edit.css",
        title: "Lambda Lab Profile"
    });
});

// Search Results Page
router.get('/search', (req, res) => {
    res.render('search_results', {
        cssFile: "search_results.css",
        title: "Search Results Page"
    });
});

// Export the router to be used in app.js or other files
module.exports = router;