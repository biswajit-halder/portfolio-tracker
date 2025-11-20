import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bh97mail_db_user:jOgCj701Fb11qEra@cluster0.9uo9hnb.mongodb.net/portfolio-tracker').then(() => console.log('DB CONNECTED'))
}