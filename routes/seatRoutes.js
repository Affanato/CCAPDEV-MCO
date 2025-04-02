const express = require('express');
const router = express.Router();
const SeatReservation = require('../models/SeatReservation');

// Get all reservations (for display)
router.get('/', async (req, res) => {
    try {
        const seats = await SeatReservation.find().populate('user', 'firstName lastName email');
        res.json(seats);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get seat availability for a specific time
router.get('/availability', async (req, res) => {
    try {
        const { lab, date } = req.query;
        const queryDate = new Date(date);
        
        // Find all reservations for this lab on this date
        const reservations = await SeatReservation.find({
            lab,
            resDate: {
                $gte: new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()),
                $lt: new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1)
            }
        });

        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Reserve a seat
router.post('/reserve', async (req, res) => {
    try {
        const { lab, seat, resDate, duration } = req.body;
        const userId = req.session.user.id;

        // Convert dates
        const startDate = new Date(resDate);
        const endDate = new Date(startDate.getTime() + duration * 60000);

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Check for conflicts
        const existing = await SeatReservation.findOne({
            lab,
            seat,
            $or: [
                // Check if there's any reservation where:
                // 1. The existing reservation starts during our new reservation time
                { resDate: { $gte: startDate, $lt: endDate } },
                // 2. The existing reservation ends during our new reservation time
                { endDate: { $gt: startDate, $lte: endDate } },
                // 3. The existing reservation completely encompasses our new reservation time
                {
                    resDate: { $lte: startDate },
                    endDate: { $gte: endDate }
                }
            ]
        });

        if (existing) {
            return res.status(400).json({ message: "Seat already reserved for this time slot" });
        }

        const newReservation = new SeatReservation({
            lab,
            seat,
            resDate: startDate,
            endDate,
            user: userId,
            duration,
            status: 'confirmed'
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
