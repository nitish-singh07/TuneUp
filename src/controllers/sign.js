import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !username) {
    return res.status(400).json({ message: "All field are required" });
  }

  const token = jwt.sign(username, secret);

  return res.status(200).json({ token: token, message: "Login succesfully" });
};

export default signIn;
