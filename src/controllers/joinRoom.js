import Room from "../models/room.models.js";
import User from "../models/user.models.js";

export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;

    const user = await User.findOne({ username: req.username });

    if (!roomCode) {
      return res.status(400).json({ message: "roomCode is required" });
    }

    // Find the room by roomCode
    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if user is already in the room
    if (room.users.includes(userId)) {
      return res.status(200).json({ message: "Already in the room", room });
    }

    room.users.push(user._id);
    await room.save();

    return res.status(200).json({ message: "Joined room successfully", room });
  } catch (error) {
    console.error("Error joining room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
