const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
   updateAppointmentStatus,
   getMyPatients,
} = require("../controllers/appointmentController");

// Patient books appointment
router.post("/book", protect, bookAppointment);

// User sees their appointments
router.get("/my", protect, getUserAppointments);

// Doctor sees all appointments assigned to them
router.get("/doctor", protect, getDoctorAppointments);

// Doctor updates appointment (approve/cancel)
router.put("/update-status", protect, updateAppointmentStatus);

// Doctor sees their patients
router.get("/patients" , protect , getMyPatients)

module.exports = router;
