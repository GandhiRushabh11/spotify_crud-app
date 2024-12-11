const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      console.error("MONGODB_URL is not defined in environment variables.");
      process.exit(1);
    }

    const { connection } = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`MongoDB connected: ${connection.host}/${connection.name}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
