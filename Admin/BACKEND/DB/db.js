import mongoose from "mongoose";
import 'dotenv/config'
import adminModel from '../models/admin.model.js';

async function seedAdmin() {
    try {
        const adminExists = await adminModel.findOne({ role: 'Admin' });
        if (!adminExists) {
            const email = process.env.ADMIN_EMAIL || 'admin@gmail.com';
            const password = process.env.ADMIN_PASSWORD || 'admin1234';
            
            const hashedPassword = await adminModel.hashPassword(password);
            
            await adminModel.create({
                email,
                password: hashedPassword,
                role: 'Admin'
            });
            console.log(`Default admin created: ${email}`);
        }
    } catch (err) {
        console.log("Error seeding admin:", err.message);
    }
}

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await seedAdmin();
  } catch (err) {
    console.log(err);
  }
}

export default connect;

