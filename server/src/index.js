import express from "express";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { Server } from "socket.io";
import http from "http";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Add error handler middleware
app.use(errorHandler);

// Add security middlewares
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomCode) => {
    socket.join(roomCode);
  });

  socket.on("newVote", async ({ roomCode, musicId, voteType }) => {
    // Update votes and notify room
    io.to(roomCode).emit("voteUpdate", { musicId, newVotes });
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const validateMusicInput = [
  body("videoId").notEmpty().trim(),
  body("title").notEmpty().trim(),
  body("duration").isNumeric(),
];
