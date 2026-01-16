const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

const {
  submitAvailability,
  getDoctorAvailability,
  approveAvailability,
  getPendingAvailabilities,
  rejectAvailability,
  getMyAvailability,
} = require("../controllers/availabilityController");

// Doctor
router.post("/doctor", protect, submitAvailability);
router.get("/my", protect, getMyAvailability);


// ✅ ADMIN ROUTES FIRST
router.get("/pending", protectAdmin, getPendingAvailabilities);
router.put("/approve/:id", protectAdmin, approveAvailability);
router.put("/reject/:id", protectAdmin, rejectAvailability);

// ✅ USER ROUTE LAST
router.get("/:doctorId", getDoctorAvailability);

module.exports = router;

