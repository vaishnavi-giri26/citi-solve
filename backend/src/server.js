// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import connectdatabase from "./config/database.js";
// import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js";

// dotenv.config();

// connectdatabase();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: "https://citi-solve-1-y9i5.onrender.com",
//   credentials: true
// }));

// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
  // .then(() => {
  //   console.log("MongoDB Connected");
  //   app.listen(process.env.PORT, () => {
  //     console.log(`Server running on port ${process.env.PORT}`);
  //   });
  // })
  // .catch((err) => console.log(err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import connectdatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

const app = express();

// Connect database
connectdatabase();

// Middleware
app.use(
cors({
origin: [
"http://localhost:5173",
"https://citi-solve-frontend-gbqd.onrender.com"
],
credentials: true
})
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// MongoDB connection and server start
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
app.listen(process.env.PORT || 5000, () => {
console.log(`Server running on port ${process.env.PORT || 5000}`);
});
})
.catch((err) => console.log(err));

