import express from "express";
import signUp from "../controllers/signUp.js";
import signIn from "../controllers/sign.js";
import authmiddleware from "../middlewares/auth.middlewares.js";
import { createRoom } from "../controllers/createRoom.js";
import { joinRoom } from "../controllers/joinRoom.js";
import { addToQueue, getCurrentQueue } from "../controllers/queueController.js";
import { voteForMusic } from "../controllers/voteController.js";
import { getRoomHistory } from "../controllers/historyController.js";
import {
  updateRoomStatus,
  updateMusicStatus,
  getRoomStats,
} from "../controllers/roomController.js";

const router = express.Router();

// Auth routes
router.post("/signUp", signUp);
router.post("/signIn", signIn);

// Protected routes
router.use(authmiddleware);
router.post("/createRoom", createRoom);
router.post("/joinRoom", joinRoom);

// Queue management
router.post("/room/:roomCode/queue", addToQueue);
router.get("/room/:roomCode/queue", getCurrentQueue);

// Voting
router.post("/music/:musicId/vote", voteForMusic);

// History
router.get("/room/:roomCode/history", getRoomHistory);

// Room management
router.patch("/room/:roomCode/status", updateRoomStatus);
router.patch("/music/:musicId/status", updateMusicStatus);
router.get("/room/:roomCode/stats", getRoomStats);

export default router;
