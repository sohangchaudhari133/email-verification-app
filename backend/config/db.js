import mongoose from 'mongoose';

/**
 * Connects to MongoDB using environment variables.
 * Exits the process if connection fails.
 */

export const connectDB = async() => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.log("MongoDB connection Error: ",error);
        process.exit(1); // Exit process with failure
    }
}