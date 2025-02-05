import Music from "../models/music.models.js";
import Room from "../models/room.models.js";
import User from "../models/user.models.js";

export const addToQueue = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { videoId, title, duration } = req.body;

    // Find the user
    const user = await User.findOne({ username: req.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the room
    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Create new music entry
    const newMusic = new Music({
      videoId,
      title,
      duration,
      uploadedBy: user._id,
      room: room._id,
      status: "queued",
    });

    // Save the music
    await newMusic.save();

    // Add to room's queue
    room.musicQueue.push(newMusic._id);
    await room.save();

    // Return success response
    return res.status(201).json({
      message: "Music added to queue",
      music: newMusic,
      queuePosition: room.musicQueue.length,
    });
  } catch (error) {
    console.error("Add to queue error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCurrentQueue = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode })
      .populate("musicQueue")
      .populate("currentlyPlaying");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      currentlyPlaying: room.currentlyPlaying,
      queue: room.musicQueue,
    });
  } catch (error) {
    console.error("Get queue error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
