export const getRoomStats = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode })
      .populate("playHistory.music")
      .populate("users");

    const stats = {
      totalPlays: room.playHistory.length,
      mostPlayedSongs: await Music.find({ room: room._id })
        .sort({ playCount: -1 })
        .limit(5),
      totalParticipants: room.users.length,
      currentlyActive: room.isActive,
      queueLength: room.musicQueue.length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// Create a central error handler
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};
