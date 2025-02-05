import Music from "../models/music.models.js";
import Vote from "../models/vote.models.js";
import User from "../models/user.models.js";

export const voteForMusic = async (req, res) => {
  try {
    const { musicId } = req.params;
    const { voteType } = req.body;

    const existingVote = await Vote.findOne({
      user: req.userId,
      music: musicId,
    });

    if (existingVote) {
      return res.status(400).json({ message: "Already voted" });
    }

    const newVote = new Vote({
      user: req.userId,
      music: musicId,
      voteType,
    });

    await newVote.save();

    const music = await Music.findById(musicId);
    music.totalVotes += voteType === "up" ? 1 : -1;
    music.votes.push(newVote._id);
    await music.save();

    return res.status(200).json({ message: "Vote recorded" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
