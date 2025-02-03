import express from "express";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

connectDB();
// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes under "/api" path
app.use("/api", router);

// Root route to send a message
app.get("/", (req, res) => {
  res.json("Hello world from the server side");
});

// Define the port
const PORT = 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
