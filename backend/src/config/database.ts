import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  try {
    if (!URI) {
      throw new Error("MONGODB_URI not defined");
    }

    await mongoose.connect(URI);
    console.log("✅Connected to MongoDB");
  } catch (error) {
    console.log("❌Error connecting to MongoDB", error);
    process.exit(1);
  }
};
