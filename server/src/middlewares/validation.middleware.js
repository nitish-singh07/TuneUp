import { body, param } from "express-validator";

export const createRoomValidation = [
  body("roomName").trim().notEmpty().withMessage("Room name is required"),
];

export const joinRoomValidation = [
  body("roomCode").trim().notEmpty().withMessage("Room code is required"),
];

export const musicValidation = [
  body("videoId").trim().notEmpty().withMessage("Video ID is required"),
  body("title").trim().notEmpty().withMessage("Title is required"),
];

export const voteValidation = [
  body("voteType").isIn(["up", "down"]).withMessage("Invalid vote type"),
];
