const express = require('express');
const router = express.Router();
const SeatReservation = require('../models/SeatReservation');

// Get all reservations (for display)
router.get('/', async (req, res) => {
    try {
        const seats = await SeatReservation.find().populate('reservedBy', 'firstName lastName email');
        res.json(seats);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Reserve a seat
router.post('/reserve', async (req, res) => {
    try {
        const { seatNumber, classroom, userId, startDate, endDate } = req.body;

        const existingReservation = await SeatReservation.findOne({ seatNumber, classroom });
        if (existingReservation) return res.status(400).json({ message: "Seat already reserved" });

        const newReservation = new SeatReservation({ seatNumber, classroom, reservedBy: userId, startDate, endDate });
        await newReservation.save();

        res.status(201).json({ message: "Seat reserved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Update reservation
router.put('/update/:id', async (req, res) => {
    try {
        const { seatNumber, classroom, startDate, endDate } = req.body;

        // Find and update the reservation
        const updatedReservation = await SeatReservation.findByIdAndUpdate(
            req.params.id,
            { seatNumber, classroom, startDate, endDate },
            { new: true }
        );

        if (!updatedReservation) return res.status(404).json({ message: "Reservation not found" });

        res.json({ message: "Reservation updated successfully!", updatedReservation });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Cancel a reservation
router.delete('/cancel/:id', async (req, res) => {
    try {
        await SeatReservation.findByIdAndDelete(req.params.id);
        res.json({ message: "Reservation canceled" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
