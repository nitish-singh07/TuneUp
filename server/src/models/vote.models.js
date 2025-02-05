import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  music: { type: mongoose.Schema.Types.ObjectId, ref: "Music", required: true },
  voteType: { type: String, enum: ["up", "down"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Vote = mongoose.model("Vote", VoteSchema);

export default Vote;
