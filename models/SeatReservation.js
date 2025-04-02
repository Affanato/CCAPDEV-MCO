// models/SeatReservation.js
const mongoose = require('mongoose');

const SeatReservationSchema = new mongoose.Schema({
    seat: { type: String, required: true },
    lab: {
        type: String,
        required: true,
        enum: ['GK101A', 'GK304A', 'GK304B', 'AG702', 'AG1904', 'LS209', 'LS311']
    },
    resDate: {
        type: Date,
        required: true,
        index: true
    },
    reqDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: { type: Date, required: true },
    anon: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    duration: { type: Number, required: true }, // in minutes
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('SeatReservation', SeatReservationSchema);
