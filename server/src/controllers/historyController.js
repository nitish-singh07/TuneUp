import Room from "../models/room.models.js";

export const getRoomHistory = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode })
      .populate("playHistory.music")
      .populate("users", "username");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({
      history: room.playHistory,
      participants: room.users,
      totalPlays: room.playHistory.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching room history", error: error.message });
  }
};
