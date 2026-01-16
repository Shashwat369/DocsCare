const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
  uploadDoctorProfilePicture,
} = require("../controllers/doctorController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");

// 🔹 Public routes
router.post("/register", registerDoctor);
router.post("/login", loginDoctor);

router.get("/all", getAllDoctors);

// 🔹Protected Routes

router.put("/profile", protect, updateDoctorProfile);
router.post(
  "/profile/picture",
  protect,
  upload.single("profilePicture"),
  uploadDoctorProfilePicture
);
router.get("/:id", protect, getDoctorById);

module.exports = router;
