// const mongoose = require("mongoose");
// const { nanoid } = require("nanoid");
// import mongoose from "mongoose";
// import { nanoid } from "nanoid";

// const complaintSchema = new mongoose.Schema(
//   {
//     complaintId: {
//       type: String,
//       default: () => nanoid(6),
//       unique: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     name: String,
//     ward: String,
//     location: String,
//     category: String,
//     description: String,
//     photo: String,
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Resolved"],
//       default: "Pending",
//     },
//     resolutionNote: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Complaint", complaintSchema);
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      default: () => nanoid(6),
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    ward: Number,
    location: String,
    category: String,
    description: String,
    photo: String,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    resolutionNote: String,
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;