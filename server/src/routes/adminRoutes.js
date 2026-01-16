const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/adminController");

const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

// public
router.post("/login", loginAdmin);

// protected

router.get("/dashboard", protectAdmin, getDashboardStats);
router.get("/approved-doctors", protectAdmin, getApprovedDoctors);

router.get("/appointments", protectAdmin, getAllAppointments);
router.get("/appointments/analytics", protectAdmin, getAppointmentAnalytics);

router.patch("/appointments/:id", protectAdmin, updateAppointmentStatusByAdmin);
router.patch("/update-profile", protectAdmin, updateAdminProfile);

router.get("/pending-doctors", protectAdmin, getPendingDoctors);
router.patch("/approve-doctor/:id", protectAdmin, approveDoctor);
router.delete("/reject-doctor/:id", protectAdmin, rejectDoctor);

module.exports = router;
