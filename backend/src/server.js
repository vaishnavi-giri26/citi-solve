import express from "express";
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
app.use(
cors({
origin: [
"http://localhost:5173",
"https://citi-solve-frontend-gbqd.onrender.com"
],
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true
})
);

/* handle preflight */
app.options("*", cors());

/* routes */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

/* test route */
app.get("/", (req, res) => {
res.send("API is running...");
});

/* start server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
