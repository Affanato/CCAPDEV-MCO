const mongoose = require('mongoose');

const SeatReservationSchema = new mongoose.Schema({
    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom.seats', required: true }, // Links to a seat
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reservedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SeatReservation', SeatReservationSchema);
