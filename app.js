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
// app.use('/', indexRoutes);
app.use('/api/users', userRoutes); // API routes for user handling
app.use('/api/seats', seatRoutes); // API routes for seat reservations

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Render the landing page and specify that it's the homepage (to conditionally hide header)
app.get('/', (req, res) => {
    res.render('landing_page', {isLandingPage: true}); 
});
app.get('/login', (req, res) => {
    res.render('login', {extraCSS: '<link rel="stylesheet" href="/login.css">'});  // ✅ Make sure login.hbs is inside /views/layouts
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
