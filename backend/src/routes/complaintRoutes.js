import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createComplaint);
router.get("/my", auth, getMyComplaints);
router.get("/", getAllComplaints);
router.put("/:id/status", updateComplaintStatus);

export default router;
