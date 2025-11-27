import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('DB CONNECTED');
    } catch (err) {
        console.error('DB connection error:', err.message);
        process.exit(1);
    }
};