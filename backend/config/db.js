const mongoose = require('mongoose');

let isConnected = false;
let isInMemory = false;

const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 3000,
      });
      isConnected = true;
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      return { isConnected: true, isInMemory: false };
    } catch (err) {
      console.warn(`[Database] Could not connect to MongoDB at ${process.env.MONGODB_URI}.`);
      console.warn('[Database] Falling back to high-performance in-memory DSA store.');
    }
  }

  isInMemory = true;
  isConnected = true;
  console.log('[Database] In-memory DSA LMS database initialized and active.');
  return { isConnected: true, isInMemory: true };
};

const getDBStatus = () => ({
  isConnected,
  isInMemory,
});

module.exports = { connectDB, getDBStatus };
