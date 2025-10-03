const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("contacting mongo database");
    const uri = process.env.MONGO_URI;
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ecommerce-test",
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 10,
      retryReads: true,
      retryReads: true,
    });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to mongoDB : " + connection.connection.host);
    return connection;
  } catch (error) {
    console.error(`Error : ${error.message}`);
    console.error(error);
  }
};

module.exports = connectDB;
