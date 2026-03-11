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

/* FORCE CORS FOR ALL REQUESTS */
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
res.header(
"Access-Control-Allow-Methods",
"GET, POST, PUT, DELETE, OPTIONS"
);

if (req.method === "OPTIONS") {
return res.sendStatus(200);
}

next();
});

app.use(cors());

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
