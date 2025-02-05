import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true, required: true },
  roomName: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  musicQueue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
  currentlyPlaying: { type: mongoose.Schema.Types.ObjectId, ref: "Music" },
  isActive: { type: Boolean, default: true },
  playHistory: [
    {
      music: { type: mongoose.Schema.Types.ObjectId, ref: "Music" },
      playedAt: { type: Date, default: Date.now },
      votesReceived: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
