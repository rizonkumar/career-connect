import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to database");
    });

    await mongoose.connect(process.env.MONGODB_URI, {});
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;
