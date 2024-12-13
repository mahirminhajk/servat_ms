import mongoose from "mongoose";

// Connect to MongoDB
export const connect = async () => {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("🟩 Connected to MongoDB");
};
  

