import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Equipment from './models/Equipment.js';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const images = [
  "https://images.unsplash.com/photo-1591889114906-3d246b2c5f63",
  "https://images.unsplash.com/photo-1598515213953-8d8a85f3739c",
  "https://images.unsplash.com/photo-1622473590913-4ea1ebd3945f",
  "https://images.unsplash.com/photo-1614951029515-0d418f80b16e",
  "https://images.unsplash.com/photo-1600833342218-5e989bf011f7",
  "https://images.unsplash.com/photo-1613321385477-88be0707622b"
];

const equipmentData = [
  {
    name: 'John Deere Tractor',
    description: 'High-performance tractor ideal for ploughing large fields.',
    category: 'tractor',
    pricePerDay: 2000,
    location: 'Andhra Pradesh',
    images: [images[0]],
    specifications: {
      engine: '200 HP',
      fuel: 'Diesel',
      model: 'JD 5200'
    },
    isApproved: true
  },
  {
    name: 'Mini Tiller',
    description: 'Perfect for loosening and mixing soil in small farms.',
    category: 'tiller',
    pricePerDay: 800,
    location: 'Telangana',
    images: [images[1]],
    specifications: {
      model: 'T-100',
      brand: 'Honda',
      power: '6.5 HP'
    },
    isApproved: true
  },
  {
    name: 'Crop Sprayer',
    description: 'Used for spraying pesticides and fertilizers over crops.',
    category: 'sprayer',
    pricePerDay: 500,
    location: 'Tamil Nadu',
    images: [images[2]],
    specifications: {
      capacity: '16L',
      type: 'Knapsack'
    },
    isApproved: true
  },
  {
    name: 'Seed Drill',
    description: 'Machine for planting seeds in evenly spaced holes.',
    category: 'seeder',
    pricePerDay: 1000,
    location: 'Karnataka',
    images: [images[3]],
    specifications: {
      rows: '8',
      spacing: '15 cm'
    },
    isApproved: true
  },
  {
    name: 'Combine Harvester',
    description: 'Efficiently harvests a variety of grain crops.',
    category: 'harvester',
    pricePerDay: 3000,
    location: 'Maharashtra',
    images: [images[4]],
    specifications: {
      brand: 'Kubota',
      capacity: '3 tons/hr'
    },
    isApproved: true
  },
  {
    name: 'Disc Plough',
    description: 'Heavy-duty disc plough for breaking hard soil.',
    category: 'plough',
    pricePerDay: 1200,
    location: 'Punjab',
    images: [images[5]],
    specifications: {
      blades: '3',
      material: 'Steel'
    },
    isApproved: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const defaultUser = await User.findOne();
    if (!defaultUser) {
      console.error('❌ No user found. Please register a user first.');
      process.exit(1);
    }

    const equipmentWithOwner = equipmentData.map(item => ({
      ...item,
      owner: defaultUser._id
    }));

    await Equipment.deleteMany(); // Optional: Clear existing
    const result = await Equipment.insertMany(equipmentWithOwner);
    console.log(`✅ Seeded ${result.length} equipment items.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
