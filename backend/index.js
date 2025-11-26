import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import holdingsRoutes from "./routes/holdingsRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import stocksRoutes from "./routes/stocksRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { generalLimiter, authLimiter, stockLimiter } from "./middleware/rateLimitMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// CONNECT DB
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(generalLimiter);

// ROUTES
app.use("/api/auth/", authLimiter, userRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/stocks", stockLimiter, stocksRoutes);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

// ERROR HANDLING MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
