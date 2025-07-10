import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['tractor', 'tiller', 'harvester', 'sprayer', 'seeder', 'plough', 'other']
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  availability: [{
    date: {
      type: Date,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  specifications: {
    type: Map,
    of: String
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Equipment', equipmentSchema);