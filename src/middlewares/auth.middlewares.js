import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authmiddleware = (req, res, next) => {
  try {
    console.log("🔹 Middleware Reached");

    const authHeader = req.get("Authorization");
    console.log("🔹 Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(" No valid token found");
      return res
        .status(401)
        .json({ message: "Access Denied: No Bearer Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.username = decoded.username || decoded;
    console.log(" Token Verified, Proceeding to next()");

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

export default authmiddleware;
