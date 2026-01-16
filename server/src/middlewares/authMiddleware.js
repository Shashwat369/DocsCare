const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Check Doctor first
    let user = await Doctor.findById(decoded.id);
    if (user) {
      req.user = user;
      req.userRole = "doctor";

      // 🚫 Doctor approval check
      if (!user.isApproved) {
        return res.status(403).json({ message: "Doctor not approved by admin" });
      }

      return next();
    }

    // 🔍 Else check User
    user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
      req.userRole = "user";
      return next();
    }

    return res.status(404).json({ message: "User not found" });

  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = { protect };



