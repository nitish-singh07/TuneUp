import Room from "../models/room.models.js";

import crypto, { getRandomValues } from "crypto";
import User from "../models/user.models.js";

function generateRoomCode() {
  return crypto.randomBytes(3).toString("hex");
}

export const createRoom = async (req, res) => {
  console.log("inside createRoom controller reacher ");

  try {
    const { roomName } = req.body;

    const user = await User.findOne({ username: req.username });

    console.log(user, roomName);

    let isUnique = false;

    console.log(generateRoomCode());

    while (!isUnique) {
      var roomCode = generateRoomCode();
      console.log("room code inside " + roomCode);
      const existingRoom = await Room.findOne({ roomCode });
      if (!existingRoom) isUnique = true;
    }

    console.log(roomCode);

    console.log(user._id);

    const newRoom = new Room({
      roomName: roomName,
      roomCode: roomCode,
      host: user._id,

      users: [user._id],
      musicQueue: [],
    });

    await newRoom.save();

    return res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
