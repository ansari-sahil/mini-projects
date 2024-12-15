const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://sahilA3:sahilA3@mycluster.2vijhvp.mongodb.net/`;

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {});
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
