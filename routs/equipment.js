import express from 'express';
import Equipment from '../models/Equipment.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET all equipment with filters
router.get('/', async (req, res) => {
  try {
    const { search, category, location } = req.query;
    const query = { isApproved: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) query.category = category.toLowerCase();
    if (location) query.location = { $regex: location, $options: 'i' };

    const equipment = await Equipment.find(query)
      .populate('owner', 'name verified')
      .sort({ createdAt: -1 });

    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
export default router;