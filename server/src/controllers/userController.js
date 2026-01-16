const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, age } = req.body;

    if (!username || !email || !password || !gender) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // ✅ FIX 1: gender normalize (MAIN BUG FIX)
    const formattedGender =
      gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      gender: formattedGender,
      age: age ? Number(age) : undefined,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful!",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        age: user.age,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// ================= UPDATE PROFILE =================
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password, email, ...safeData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, safeData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    return res.status(500).json({ message: "Server error updating profile" });
  }
};

// ================= UPLOAD PROFILE PICTURE =================
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_pictures",
        transformation: [
          { width: 1024, height: 1024, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePicture: result.secure_url },
          { new: true }
        ).select("-password");

        return res.status(200).json({
          message: "Profile picture updated successfully",
          user: updatedUser,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  uploadProfilePicture,
};

