const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const seatRoutes = require('./routes/seatRoutes');
const indexRoutes = require('./routes/index'); // Import the main routes

const app = express();

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Setup Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main', // Use main.hbs as the default layout
    layoutsDir: path.join(__dirname, 'views/layouts'), // Directory for layout files
    partialsDir: path.join(__dirname, 'views/partials') // Directory for reusable components
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Connection Error:", err));

// Use Routes
app.use('/', indexRoutes);
app.use('/api/users', userRoutes); // API routes for user handling
app.use('/api/seats', seatRoutes); // API routes for seat reservations

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
