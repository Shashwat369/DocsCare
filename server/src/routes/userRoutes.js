const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUserProfile,
  uploadProfilePicture,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/profile", protect, updateUserProfile);
router.post(
  "/profile/picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);
module.exports = router;
