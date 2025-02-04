import express from "express";
import signUp from "../controllers/signUp.js";
import signIn from "../controllers/sign.js";
import authmiddleware from "../middlewares/auth.middlewares.js";
import { createRoom } from "../controllers/createRoom.js";
import { joinRoom } from "../controllers/joinRoom.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

router.use(authmiddleware);
router.post("/createRoom", createRoom);
router.post("/joinRoom", createRoom);
router.post("/joinRoom", joinRoom);

export default router;
