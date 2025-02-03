import express from "express";
import signUp from "../controllers/signUp.js";
import signIn from "../controllers/sign.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

export default router;
