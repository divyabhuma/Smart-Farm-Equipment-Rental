import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import Equipment from '../models/Equipment.js';
import Booking from '../models/Booking.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// === MULTER SETUP ===
// Store images in /uploads with original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// === GET USER PROFILE ===
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// === UPDATE PROFILE (text + optional image) ===
router.post('/update', authenticate, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, phone, location } = req.body;
    const updateData = { name, phone, location };

    // If image uploaded, save image path
    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
      updateData.profileImage = imagePath;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      profileImageUrl: updatedUser.profileImage // so frontend updates the pic
    });
  } catch (error) {
    console.error('❌ Update error:', error.message);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

// === EXISTING DASHBOARD + ADMIN ROUTES ===
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    let stats = {};

    if (req.user.role === 'farmer') {
      stats = {
        totalBookings: await Booking.countDocuments({ farmer: req.user.userId }),
        activeBookings: await Booking.countDocuments({ farmer: req.user.userId, status: 'active' }),
        completedBookings: await Booking.countDocuments({ farmer: req.user.userId, status: 'completed' })
      };
    } else if (req.user.role === 'owner') {
      stats = {
        totalEquipment: await Equipment.countDocuments({ owner: req.user.userId }),
        totalBookings: await Booking.countDocuments({ owner: req.user.userId }),
        pendingBookings: await Booking.countDocuments({ owner: req.user.userId, status: 'pending' }),
        totalEarnings: await Booking.aggregate([
          { $match: { owner: req.user.userId, status: 'completed' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]).then(result => result[0]?.total || 0)
      };
    } else if (req.user.role === 'admin') {
      stats = {
        totalUsers: await User.countDocuments(),
        totalEquipment: await Equipment.countDocuments(),
        totalBookings: await Booking.countDocuments(),
        pendingApprovals: await Equipment.countDocuments({ isApproved: false })
      };
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/all', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
