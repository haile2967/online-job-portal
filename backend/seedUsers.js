import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();
    // Clear existing users
    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'Company User',
        email: 'company@example.com',
        password: 'password123',
        role: 'company',
        companyName: 'Tech Innovations Inc',
        industry: 'Information Technology',
      },
      {
        name: 'Job Seeker',
        email: 'jobseeker@example.com',
        password: 'password123',
        role: 'jobseeker',
      },
    ];

    for (let user of users) {
      await User.create(user);
    }
    
    console.log('Users seeded successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
