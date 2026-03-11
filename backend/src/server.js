import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

/* CONNECT DATABASE */
connectdatabase();

/* MIDDLEWARE */
app.use(express.json());

/* CORS CONFIGURATION */
const corsOptions = {
origin: [
"http://localhost:5173",
"https://citi-solve-frontend-gbqd.onrender.com"
],
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

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
