export const updateMusicStatus = async (req, res) => {
  try {
    const { musicId } = req.params;
    const { status } = req.body;

    const music = await Music.findById(musicId);
    const room = await Room.findById(music.room);

    if (status === "played") {
      music.playCount += 1;
      room.playHistory.push({
        music: musicId,
        votesReceived: music.totalVotes,
      });
    }

    music.status = status;
    await music.save();
    await room.save();

    res.json({ message: "Music status updated", music });
  } catch (error) {
    res.status(500).json({ message: "Error updating music status" });
  }
};
