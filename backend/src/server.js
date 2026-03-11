import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

/* CORS MUST BE FIRST */
app.use(cors());
app.options("*", cors());

/* BODY PARSER */
app.use(express.json());

/* DATABASE */
connectdatabase();

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
res.send("API is running...");
});

/* START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
