const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const seatRoutes = require('./routes/seatRoutes');
const indexRoutes = require('./routes/index'); // Import the main routes

const app = express();

// Session 
app.use(session({
    secret: 'lambda_lab_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false } // true if HTTPS
}));

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', (req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.type('application/javascript'); 
    }
    next();
});

// Setup Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),  // Ensures layout files are in the right folder
    partialsDir: path.join(__dirname, 'views', "partials") // Points to Partials
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("DB Connection Error:", err));

// Use Routes
app.use('/', userRoutes); // For POST requests
app.use('/api/seats', seatRoutes); // API routes for seat reservations
app.use('/', indexRoutes); // Main routes (landing page, etc.)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));