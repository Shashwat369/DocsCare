const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, enum: ["admin", "doctor", "user"], required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date,  index: { expires: 300 }, required: true },
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);
module.exports = PasswordReset;
