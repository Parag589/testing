import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/your-database";

mongoose.connect(connectionString, {});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB!");
});

export default db;
