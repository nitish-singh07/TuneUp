import express from "express";
import signUp from "../controllers/signUp.js";
import signIn from "../controllers/sign.js";
import authmiddleware from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

router.use(authmiddleware);
router.post("/createRoom ");

export default router;
