import zod from "zod";
import User from "../models/user.models.js";

const usernameSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

const signup = async function (req, res) {
  const { username, email, password } = req.body;

  const reponseUsername = username.safeParse(username);
  const reponseEmail = username.safeParse(email);
  const reponsePassword = username.safeParse(password);

  if (!reponsEmail.sucess || !reponseUsername.sucess || !reponsePassword) {
    res.json({ message: "invalid inputs " });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    res.json({ message: "email already used" });
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    res.json({ message: "user already taken" });
  }

  const newUser = new User({ username, email, password });
};

export default signup;
