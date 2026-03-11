import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

/* connect database */
connectdatabase();

/* middleware */
app.use(express.json());

/* CORS FIX */
app.use(cors({
origin: "*",
methods: ["GET","POST","PUT","DELETE","OPTIONS"],
allowedHeaders: ["Content-Type","Authorization"]
}));

/* allow preflight */
app.options("*", cors());

/* routes */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

/* server start */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
})
.catch(err => console.log(err));
