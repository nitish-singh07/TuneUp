import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secret = process.env.JWT_SECRET;

const authmiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Bearer Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.username = decoded;
    console.log(req.header);
    next();
  } catch (error) {
    res.status(403).res.json({ message: "Invalid or Expired Token" });
  }
};

export default authmiddleware;
