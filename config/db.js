const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Server will continue without database connection');
    console.log('Frontend will use local storage for data');
  }
};

module.exports = connectDB;