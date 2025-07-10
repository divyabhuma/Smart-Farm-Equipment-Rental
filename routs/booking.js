import express from 'express';
import Booking from '../models/Booking.js';
import Equipment from '../models/Equipment.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// POST: Book Equipment
router.post('/', authenticate, async (req, res) => {
  try {
    const { equipmentId, startDate, endDate } = req.body;
    const equipment = await Equipment.findById(equipmentId).populate('owner');
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalAmount = equipment.pricePerDay * days;

    const booking = new Booking({
      equipment: equipment._id,
      farmer: req.user.userId,
      owner: equipment.owner._id,
      startDate,
      endDate,
      totalAmount
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });

  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

export default router;
