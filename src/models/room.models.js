import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true, required: true },
  roomName: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  musicQueue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
