const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const cors = require('cors');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const seatRoutes = require('./routes/seatRoutes');
const indexRoutes = require('./routes/index'); // Import the main routes

const app = express();

// Middleware for security and JSON URL encoding
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Setup Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),  // ✅ Ensures layout files are in the right folder
    partialsDir: path.join(__dirname, 'views', "partials") // ✅ Points to Partials
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error("DB Connection Error:", err);
        process.exit(1); // Exit if MongoDB connection fails
    });

// Use Routes
app.use('/register', userRoutes); // API routes for user handling
app.use('/api/seats', seatRoutes); // API routes for seat reservations

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Render the landing page and specify that it's the homepage (to conditionally hide header)
app.get('/', (req, res) => {
    res.render('landing_page',{
        isLandingPage: true,
        cssFile: "landing_page.css"
    });
});

app.get('/login', (req, res) => {
    res.render('login',
        {cssFile: "login.css"});  
});

app.get('/reservation', (req, res) => {
    res.render('reservation', {
        buildings: [
            { value: "goks", name: "Gokongwei" },
            { value: "andrew", name: "Andrew" },
            { value: "st_la_salle", name: "St. La Salle" }
        ],
        rooms: [
            { value: "GK104", name: "GK104" },
            { value: "GK103", name: "GK103" },
            { value: "AG1905", name: "AG1905" },
            { value: "AG1906", name: "AG1906" },
            { value: "LS319", name: "LS319" },
            { value: "LS226", name: "LS226" }
        ],
        currentMonth: "February",
        weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        availableDates: [28, 29, 30, 31, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,1,2,3,4,5,6,7,8,9,10],
        times: ["7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM"],
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


app.get('/home', (req, res) => {
    res.render('landing_page',
        {isLandingPage: true, cssFile:"landing_page.css"
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        cssFile: "register.css"  
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        cssFile: "about.css"  // Optional if there's a separate CSS file
    });
});

// Profile Page
app.get('/profile', (req, res) => {
    res.render('profile', {
        cssFile: "profile.css"  // Optional if there's a separate CSS file
    });
});

// Profile Edit Page
app.get('/profile/edit', (req, res) => {
    res.render('profile_edit', {
        cssFile: "profile_edit.css"
    });
});

// Search Results Page
app.get('/search-results', (req, res) => {
    res.render('search_results', {
        cssFile: "search_results.css"
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
