const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");
const Appointment = require("../models/Appointment")
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Admin login successful",
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      clinicName: admin.clinicName,
      email: admin.email,
    },
  });
};
// Get All pending doctors

const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({
      isApproved: false,
      clinicName: req.admin.clinicName, // ✅ MATCH CORRECTLY
    }).select("-password");

    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve Doctor

const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor approved successfully", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true }).select("-password");

    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject Doctor

const rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor rejected successfully!!!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({
      isApproved: false,
      clinicName: req.admin.clinicName,
    }).select("-password");

    const approvedCount = await Doctor.countDocuments({
      isApproved: true,
      clinicName: req.admin.clinicName,
    });

    const totalDoctors = await Doctor.countDocuments({
      clinicName: req.admin.clinicName,
    });

    res.status(200).json({
      pendingCount: pendingDoctors.length,
      approvedCount,
      totalDoctors,
      pendingDoctors: pendingDoctors.slice(0, 10), // 👈 dashboard me sirf 10
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const { status = "all", page = 1, limit = 10 } = req.query;

    const query = {};
    if (status !== "all") {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate("user", "username email")
      .populate("doctor", "username department")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      appointments,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateAppointmentStatusByAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment status updated",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAppointmentAnalytics = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const todayCount = await Appointment.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    const weekCount = await Appointment.countDocuments({
      createdAt: { $gte: startOfWeek },
    });

    res.status(200).json({
      today: todayCount,
      week: weekCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/adminController.js

const updateAdminProfile = async (req, res) => {
  try {
    const { clinicName } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { clinicName },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Profile updated",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        clinicName: admin.clinicName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  loginAdmin,
  getPendingDoctors,
  approveDoctor,
  getApprovedDoctors,
  rejectDoctor,
  getDashboardStats,
  getAllAppointments,
  updateAppointmentStatusByAdmin,
  getAppointmentAnalytics,
  updateAdminProfile,
};
