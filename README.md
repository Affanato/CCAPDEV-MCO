# Lambda Lab Reservation System

The **Lambda Lab Reservation System** is a web application designed to facilitate the reservation of computer laboratory slots. It allows students to reserve seats in labs and lab technicians to manage reservations efficiently. The system is built using **Node.js**, **Express**, **MongoDB**, **Mongoose**, and **Handlebars**.

---

## Features

### Core Features
- **View Slot Availability**: 
    - Check available seats in labs 
- **Register**: 
    - Create an account 
    - Two account types: `Student` and `Lab Technician` 
- **Login/Logout**: 
    - Login to access reservation features.
- **User Profiles**: 
    - View and edit profiles, including user bio descriptions.
    - View current reservations on the profile page.
- **Search**: 
    - Search for users.

### General Features
- **Responsive Design**: 
    - A user-friendly interface with a cohesive and consistent design.
- **MVC Architecture**: 
    - Follows the Model-View-Controller (MVC) design pattern for scalability and maintainability.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Handlebars
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Session Management**: `express-session`, `connect-mongo`
- **Security**: `bcrypt` for password hashing
- **Other Libraries**: `dotenv`, `helmet`

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Steps to Run Locally

1. Clone the repository:

    git clone https://github.com/Affanato/CCAPDEV-MCO.git
    cd CCAPDEV-MCO

2. Install dependencies:

    `npm install`

3. Create a .env file in the root directory and add the following:

    MONGO_URI=<your_mongo_connection_string>
    PORT=3000

4. Start the server: 

    `node app.js`

5. Open your browser and go to:

    http://localhost:3000

## Project Structure 

CCAPDEV-MCO/
├── app.js                # Main application file
├── .env                    # Environment variables
├── models/                 # Mongoose schemas
│   ├── SeatReservation.js
│   └── User.js
├── public/                 # Static assets (CSS, JS, images)
│   ├── Assets/
│   ├── frontendJS/
│   ├── about.css
│   ├── landing_page.css
│   └── ...
├── routes/                 # Express routes
│   ├── index.js
│   ├── seatRoutes.js
│   └── userRoutes.js
├── views/                  # Handlebars templates
│   ├── layouts/
│   ├── partials/
│   ├── about.hbs
│   ├── landing_page.hbs
│   └── ...
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation


## Deployment 

The application is deployed on the platform **Render**

## Contributors

- Nio Tujan
- Renz Tabuzo
- Kelvin Alviar
- Xander Diamante

## Acknowledgments

- **DLSU CCAPDEV Course**: For providing the project specifications and guidance.
- **Open Source Libraries**: For the tools and frameworks used in this project.
