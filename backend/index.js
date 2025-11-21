import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import holdingRoutes from "./routes/holdingRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// CONNECT DB
connectDB();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/api/auth/", userRoutes);
app.use("/api/holdings", holdingRoutes);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
