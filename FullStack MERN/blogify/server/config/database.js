const mongoose = require("mongoose");
//connect to db

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw Object.assign(new Error("MONGO_URL is not set"), { statusCode: 500 });
    }
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("DB has been connected");
  } catch (error) {
    console.log("DB Connection failed", error.message);
    const msg = String(error?.message || "");
    if (msg.includes("ENOTFOUND") || msg.includes("querySrv")) {
      console.log(
        "MongoDB host could not be resolved. Your Atlas cluster hostname in MONGO_URL is likely invalid/outdated, or DNS is blocked."
      );
      console.log(
        "Fix: open MongoDB Atlas -> Database -> Connect -> Drivers, copy the new connection string, and update server/.env MONGO_URL."
      );
      console.log(
        "Alternative: use the non-SRV (mongodb://...) standard connection string if your network/DNS blocks SRV records."
      );
    }
    throw error;
  }
};
module.exports = connectDB;
