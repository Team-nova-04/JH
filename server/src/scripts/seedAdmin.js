require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

/**
 * Seed Script - Create Default Admin User
 * Run this script to create an initial admin account
 */

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: "admin@civicsense.gov",
    });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@civicsense.gov");
      console.log(
        "You can reset the password by deleting the admin and running this script again."
      );
      process.exit(0);
    }

    // Create default admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = await Admin.create({
      name: "System Administrator",
      email: "admin@civicsense.gov",
      password: hashedPassword,
      isSuperAdmin: true,
    });

    console.log("✅ Default admin user created successfully!");
    console.log("\n📧 Login Credentials:");
    console.log("   Email: admin@civicsense.gov");
    console.log("   Password: admin123");
    console.log("\n⚠️  IMPORTANT: Change the password after first login!");
    console.log("\n🔗 Login at: http://localhost:5173/admin/login");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
