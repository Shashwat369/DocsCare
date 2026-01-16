const mongoose = require("mongoose");

const doctorAvailabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      unique: true,
    },

    days: {
      type: [String],
      required: true,
    },

    slots: {
      morning: {
        from: String,
        to: String,
      },
      evening: {
        from: String,
        to: String,
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
