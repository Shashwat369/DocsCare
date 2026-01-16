const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary");

const registerDoctor = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      department,
      experience,
      fees,
      location,
      clinicName, 
    } = req.body;

    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      username,
      email,
      password: hashPassword,
      department,
      experience: Number(experience),
      fees: Number(fees),
      location,
      clinicName, 
    });

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).select("+password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!doctor.isApproved) {
      return res.status(403).json({
        message: "Your profile is pending admin approval",
      });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    doctor.password = undefined; // response me mat bhejna

    res.status(200).json({
      success: true,
      token,
      doctor,
    });
  } catch (error) {
    console.error("Doctor login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true }).select("-password");
    res.status(200).json({ doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctor details" });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, {
      new: true,
    }).select("-password");

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Doctor profile update error:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

const uploadDoctorProfilePicture = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "doctor_profiles",
        transformation: [
          { width: 1024, height: 1024, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      async (err, result) => {
        if (err) {
          console.error("Cloudinary error:", err);
          return res.status(500).json({ message: "Cloudinary error" });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
          req.user._id,
          { profilePicture: result.secure_url },
          { new: true } // ❌ runValidators intentionally avoided
        );

        if (!updatedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({
          message: "Profile picture updated",
          doctor: updatedDoctor,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("Doctor picture error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
  uploadDoctorProfilePicture,
};
