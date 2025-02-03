import zod from "zod";
import User from "../models/user.models.js";

const usernameSchema = zod.string();
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

const signUp = async function (req, res) {
  const { username, email, password } = req.body;

  const reponseUsername = usernameSchema.safeParse(username);
  const reponseEmail = emailSchema.safeParse(email);
  const reponsePassword = passwordSchema.safeParse(password);

  if (!reponseEmail.success) {
    return res.status(400).json({ message: "email in valid  " });
  }
  if (!reponseUsername.success) {
    console.log(reponseUsername);

    return res.status(400).json({ message: "invalid username" });
  }
  if (!reponsePassword) {
    return res.status(400).json({ message: "week password" });
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res.status(400).json({ message: "Email already used" });
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "user already taken" });
  }

  const newUser = new User({ username, email, password });

  await newUser.save();

  return res.status(201).json({ message: "User registered successfully!" });
};

export default signUp;
