import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    //  use the same key name as in adminLogin
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const admin = await userModel.findOne({ email: decoded.email });

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied: Not an admin" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
