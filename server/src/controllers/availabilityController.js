const DoctorAvailability = require("../models/DoctorAvailability");
const Doctor = require("../models/Doctor");

/* =========================
   Doctor submits availability
========================= */
const submitAvailability = async (req, res) => {
  try {
    const { days, slots } = req.body;

    if (!days || days.length === 0) {
      return res.status(400).json({ message: "Days are required" });
    }

    if (!slots || (!slots.morning && !slots.evening)) {
      return res
        .status(400)
        .json({ message: "At least one time slot is required" });
    }

    const doctor = await Doctor.findOne({ email: req.user.email });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const availability = await DoctorAvailability.findOneAndUpdate(
      { doctor: doctor._id },
      {
        doctor: doctor._id,
        days,
        slots,
        status: "pending",
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Availability submitted, waiting for admin approval",
      availability,
    });
  } catch (err) {
    console.error("submitAvailability error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Patient – view approved availability
========================= */
const getDoctorAvailability = async (req, res) => {
  try {
    const availability = await DoctorAvailability.findOne({
      doctor: req.params.doctorId,
      status: "approved",
    });

    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Admin – approve availability
========================= */
const approveAvailability = async (req, res) => {
  try {
    const updated = await DoctorAvailability.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Availability not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   Admin – get pending availabilities
========================= */
const getPendingAvailabilities = async (req, res) => {
  try {
    const list = await DoctorAvailability.find({ status: "pending" }).populate(
      "doctor",
      "username email department"
    );

    res.status(200).json(list);
  } catch (err) {
    console.error("getPendingAvailabilities error:", err);
    res.status(500).json({
      message: "Failed to load pending availabilities",
    });
  }
};

const rejectAvailability = async (req, res) => {
  try {
    const updated = await DoctorAvailability.findByIdAndUpdate(
      req.params.id,
      { status: " rejected", reason: req.body.reason || "Not Specified" },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.json({ message: "Availability Rejected", updated });
  } catch (err) {
    console.error("rejectAvailability error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Doctor Rejection Reason

const getMyAvailability = async (req, res) => {
  try {
    const availability = await DoctorAvailability.findOne({
      doctor: req.user._id,
    });

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  submitAvailability,
  getDoctorAvailability,
  approveAvailability,
  getPendingAvailabilities,
  rejectAvailability,
  getMyAvailability,
};
