import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

/* ---------- DATABASE ---------- */
connectdatabase();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

app.use(
cors({
origin: [
"http://localhost:5173",
"https://citi-solve-frontend-gbqd.onrender.com"
],
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
credentials: true
})
);

/* handle preflight */
app.options("*", cors());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
})
.catch((err) => console.log(err));
