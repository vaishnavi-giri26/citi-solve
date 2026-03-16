import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

/* CORS MUST COME FIRST */
app.use(
  cors({
    origin: "https://citi-solve-frontend-gbqd.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* Middleware */
app.use(express.json());

/* Connect database */
connectdatabase();

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* Start server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
