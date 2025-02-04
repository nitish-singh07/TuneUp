import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
  videoId: { type: String, required: true }, // Direct YouTube Video ID
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  createdAt: { type: Date, default: Date.now },
});

const Music = mongoose.model("Music", MusicSchema);

export default Music;
