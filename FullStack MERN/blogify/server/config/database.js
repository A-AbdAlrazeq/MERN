const mongoose = require("mongoose");
//connect to db

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://AbdAlrahman:FSPOvlV9rNPrSnaI@cluster0.sfk2j5s.mongodb.net/mern-blog?retryWrites=true&w=majority"
    );
    console.log("DB has been connected");
  } catch (error) {
    console.log("DB Connection failed", error.message);
  }
};
module.exports = connectDB;
