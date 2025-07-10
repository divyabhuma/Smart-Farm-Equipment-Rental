import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
