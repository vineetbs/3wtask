import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoute";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/userModel";

dotenv.config();
const mongoUri = process.env.MONGO_URI as string;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

const seedDb = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const users = [
        { name: "Ram" },
        { name: "Riya" },
        { name: "Jiya" },
        { name: "Amira" },
        { name: "Ravi" },
        { name: "Sita" },
        { name: "Gita" },
        { name: "Mohan" },
        { name: "Sohan" },
        { name: "Kiran" },
      ];
      await User.insertMany(users);
      console.log("Database seeded with initial users");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    seedDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
