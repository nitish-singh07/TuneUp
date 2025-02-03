import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MongoURI = process.env.MONGODB_URI;

// Ensure MongoURI is defined before connecting
if (!MongoURI) {
  console.error("MONGODB_URI is not defined in the environment variables.");
  process.exit(1); // Exit the process if no URI is found
}

// Connect to MongoDB
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
