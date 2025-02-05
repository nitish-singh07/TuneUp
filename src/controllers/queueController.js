import Music from "../models/music.models.js";
import Room from "../models/room.models.js";

export const addToQueue = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { videoId, title, duration } = req.body;

    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const newMusic = new Music({
      videoId,
      title,
      duration,
      uploadedBy: req.userId,
      room: room._id,
    });

    await newMusic.save();
    room.musicQueue.push(newMusic._id);
    await room.save();

    return res
      .status(201)
      .json({ message: "Music added to queue", music: newMusic });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCurrentQueue = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode }).populate({
      path: "musicQueue",
      populate: {
        path: "uploadedBy",
        select: "username",
      },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      queue: room.musicQueue,
      currentlyPlaying: room.currentlyPlaying,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
