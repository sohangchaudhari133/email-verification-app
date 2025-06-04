import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/Auth.routes.js"
import { connectDB } from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 8000

const app = express();

// Connect to MongoDB database
connectDB()
.then(() => {
    console.log("App Running Successfully");
})
.catch(() => {
    console.log("Express Error")
})

// Enable CORS for frontend origin and allow credentials
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

// Parse incoming JSON requests
app.use(express.json())

// Mount authentication routes under /api/auth
app.use('/api/auth',AuthRoutes);

// Start the Express server
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})