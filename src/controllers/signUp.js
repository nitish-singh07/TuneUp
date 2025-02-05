import zod from "zod";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

const usernameSchema = zod.string();
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

const signUp = async function (req, res) {
  try {
    const { username, email, password } = req.body;

    const responseUsername = usernameSchema.safeParse(username);
    const responseEmail = emailSchema.safeParse(email);
    const responsePassword = passwordSchema.safeParse(password);

    if (!responseEmail.success) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!responseUsername.success) {
      return res.status(400).json({ message: "Invalid username" });
    }
    if (!responsePassword.success) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already used" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("SignUp Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default signUp;
