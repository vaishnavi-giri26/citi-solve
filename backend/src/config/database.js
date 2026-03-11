import mongoose from "mongoose";

const connectdatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected:", conn.connection.host);
    console.log("Database Name:", conn.connection.name);   // ADD THIS LINE

  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectdatabase;