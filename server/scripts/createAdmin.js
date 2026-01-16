const dotenv = require("dotenv");
const connectDB = require("../src/config/db");
const Admin = require("../src/models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: "admin@docscare.com" });
    if (existing) {
      console.log("❌ Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      clinicName: "Apollo Clinics",
      email: "admin@docscare.com",
      password: "8761", // auto hash hoga
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
