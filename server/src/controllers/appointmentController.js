const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  console.log("--- New Booking Request ---");
  console.log("REQUEST BODY:", req.body);
  console.log("REQUEST USER (from token):", req.user);
  try {
    const { doctorId, date, time} = req.body;
    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      date: new Date(date),
      time,
      status : "pending",
    });

    res
      .status(201)
      .json({ message: "Appointment Booked Successfully" , appointment });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get user's appointments
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    }).populate("doctor", "username department email");

    res.status(200).json({appointments});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get doctor's appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id,
    }).populate("user", "username email age gender");

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status, remarks } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status type!" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this appointment!" });
    }

    appointment.status = status;
    appointment.remarks = remarks || "";
    await appointment.save();

    res.status(200).json({
      message: `Appointment ${status} successfully!`,
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyPatients = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const appointments = await Appointment.find({
      doctor: req.user._id,
    })
      .populate("user", "username age gender")
      .sort({ date: -1, createdAt: -1 });

    const patientMap = new Map();

    // Today's date (time removed)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    appointments.forEach((appt) => {
      if (!appt.user) return; // safety

      const patientId = appt.user._id.toString();

      if (!patientMap.has(patientId)) {
        let derivedStatus = "Upcoming";

        const appointmentDate = new Date(appt.date);
        appointmentDate.setHours(0, 0, 0, 0);

        if (appt.status === "rejected") {
          derivedStatus = "Cancelled";
        } else if (appointmentDate < today) {
          derivedStatus = "Completed";
        }

        patientMap.set(patientId, {
          patient: appt.user,
          lastAppointment: appt.date,
          status: derivedStatus,
        });
      }
    });

    res.json([...patientMap.values()]);
  } catch (err) {
    console.error("getMyPatients error:", err);
    res.status(500).json({ message: "Server error" });
  }
};









module.exports = {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getMyPatients,

};
