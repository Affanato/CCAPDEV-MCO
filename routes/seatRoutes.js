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
        const { lab, seat, resDate, duration, anon } = req.body;
        const userId = req.session.user.id;

        // Validate received resDate string before creating Date object
        if (!resDate || typeof resDate !== 'string') {
            return res.status(400).json({ message: "Invalid reservation date format received." });
        }

        // Convert duration to end date
        const startDate = new Date(resDate);
        if (isNaN(startDate.getTime())) {
            return res.status(400).json({ message: "Invalid reservation date." });
        }

        // Validate duration
        if (isNaN(numericDuration) || numericDuration <= 0) {
            console.error("Invalid duration received:", duration);
            return res.status(400).json({ message: "Invalid duration provided." });
        }

        const endDate = new Date(startDate.getTime() + duration * 60000);
        if (isNaN(endDate.getTime())) {
            console.error("Invalid endDate calculation:", { startDate, duration: numericDuration, endDate });
            return res.status(400).json({ message: "Could not calculate valid end date." });
        }

        // Check for conflicts
        const existing = await SeatReservation.findOne({
            lab,
            seat,
            $or: [
                {
                    resDate: {
                        $lt: new Date(endDate)
                    }
                },
                {
                    endDate: {
                        $gt: new Date(startDate)
                    }
                }
            ]
        });

        if (existing) {
            return res.status(400).json({ message: "Seat already reserved" });
        }

        const newReservation = new SeatReservation({
            lab,
            seat,
            resDate: startDate,
            duration,
            anon,
            user: userId,
            endDate
        });

        await newReservation.save();
        res.status(201).json({ message: "Reservation successful!" });
    } catch (error) {
        console.error("Reservation error:", error);
        res.status(500).json({ message: "Server error" });
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
