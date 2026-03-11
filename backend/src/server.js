import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

connectdatabase();

const app = express();

// Middleware
app.use(cors({
  origin: "https://citi-solve-1-y9i5.onrender.com",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
