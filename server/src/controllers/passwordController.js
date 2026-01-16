const PasswordReset = require("../models/PasswordReset");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

const getModelByRole = (role) => {
  if (role === "admin") return Admin;
  if (role === "doctor") return Doctor;
  return User;
};

const sendOTP = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const email = req.body?.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 1️⃣ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2️⃣ (Optional) Save OTP to DB
    // await PasswordReset.create({ email, otp, expiresAt, role });

    // 3️⃣ SEND EMAIL  ✅ (VERY IMPORTANT)
    await sendEmail(
      email,
      "DocsCare OTP",
      `Your DocsCare OTP is ${otp}`
    );

    // 4️⃣ RESPONSE LAST ME
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { email, role, otp } = req.body;

  const record = await PasswordReset.findOne({ email, role, otp });

  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (record.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  res.json({ message: "OTP verified" });
};


const resetPassword = async (req, res) => {
  const { email, role, otp, newPassword } = req.body;

  const record = await PasswordReset.findOne({ email, role, otp });
  if (!record) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const Model = getModelByRole(role);
  const hashed = await bcrypt.hash(newPassword, 10);

  await Model.findOneAndUpdate(
    { email },
    { password: hashed }
  );

  await PasswordReset.deleteMany({ email, role });

  res.json({ message: "Password updated successfully" });
};

module.exports = {
    sendOTP,
    verifyOTP,
    resetPassword,
}