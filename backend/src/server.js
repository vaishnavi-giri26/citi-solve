import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

// connect DB
connectdatabase();

// middleware
app.use(cors({
origin: [
"http://localhost:5173",
"https://citi-solve-frontend-gbqd.onrender.com"
],
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// connect MongoDB + start server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
app.listen(process.env.PORT || 5000, () => {
console.log(`Server running on port ${process.env.PORT || 5000}`);
});
})
.catch(err => console.log(err));
