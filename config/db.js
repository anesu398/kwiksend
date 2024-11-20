const mongoose = require("mongoose");

/**
 * Function to establish a connection to the MongoDB database
 */
const connectDB = async () => {
  const maxRetries = 5; // Maximum retry attempts
  const retryInterval = 5000; // Retry interval in milliseconds
  let retries = 0;

  const connect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log(`[INFO]: MongoDB connected successfully to host: ${conn.connection.host}`);
    } catch (error) {
      retries++;
      console.error(`[ERROR]: Failed to connect to MongoDB - ${error.message}`);
      
      if (retries < maxRetries) {
        console.log(`[INFO]: Retrying to connect (${retries}/${maxRetries}) in ${retryInterval / 1000}s...`);
        setTimeout(connect, retryInterval);
      } else {
        console.error(`[CRITICAL]: All ${maxRetries} connection attempts failed. Exiting...`);
        process.exit(1); // Exit process with failure
      }
    }
  };

  await connect();
};

module.exports = connectDB;
