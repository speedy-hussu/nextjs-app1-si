import mongoose from "mongoose";

console.log("helo");
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to Local MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
