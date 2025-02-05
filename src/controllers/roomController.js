import Room from "../models/room.models.js";
import Music from "../models/music.models.js";

// Update room status (active/inactive)
export const updateRoomStatus = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { isActive } = req.body;

    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.isActive = isActive;
    await room.save();

    return res.status(200).json({ message: "Room status updated", room });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Update music status (queued/playing/played)
export const updateMusicStatus = async (req, res) => {
  try {
    const { musicId } = req.params;
    const { status } = req.body;

    const music = await Music.findById(musicId);
    if (!music) {
      return res.status(404).json({ message: "Music not found" });
    }

    music.status = status;
    if (status === "played") {
      music.playCount += 1;
    }
    await music.save();

    return res.status(200).json({ message: "Music status updated", music });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get room statistics
export const getRoomStats = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode })
      .populate("users", "username")
      .populate("playHistory.music");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Calculate statistics
    const stats = {
      totalUsers: room.users.length,
      totalSongsPlayed: room.playHistory.length,
      mostPlayedSongs: await getMostPlayedSongs(room._id),
      activeUsers: room.users,
      currentlyPlaying: room.currentlyPlaying,
      isActive: room.isActive,
    };

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Helper function to get most played songs
async function getMostPlayedSongs(roomId) {
  const songs = await Music.find({ room: roomId })
    .sort({ playCount: -1 })
    .limit(5)
    .populate("uploadedBy", "username");

  return songs;
}
