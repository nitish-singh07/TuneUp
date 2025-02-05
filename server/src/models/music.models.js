import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
  videoId: { type: String, required: true }, // Direct YouTube Video ID
  title: { type: String, required: true },
  duration: { type: Number },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  status: {
    type: String,
    enum: ["queued", "playing", "played"],
    default: "queued",
  },
  totalVotes: { type: Number, default: 0 },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  playCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Music = mongoose.model("Music", MusicSchema);

export default Music;
