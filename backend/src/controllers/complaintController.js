import Complaint from "../models/Complaint.js";


// Create complaint
export const createComplaint = async (req, res) => {
  try {

    const complaint = new Complaint({
      name: req.body.name,
      ward: req.body.ward,
      location: req.body.location,
      category: req.body.category,
      description: req.body.description,
      user: req.user._id, // comes from auth middleware
      status: "Pending"
    });

    const savedComplaint = await complaint.save();

    res.status(201).json(savedComplaint);

  } catch (error) {
    console.error("Create complaint error:", error);

    res.status(500).json({
      message: "Error creating complaint",
      error: error.message
    });
  }
};



// Get complaints of logged-in citizen
export const getMyComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find({
      user: req.user._id
    });

    res.json(complaints);

  } catch (error) {
    console.error("Error fetching complaints:", error);

    res.status(500).json({
      message: "Error fetching complaints"
    });
  }
};



// Get all complaints (for admin)
export const getAllComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find();

    res.json(complaints);

  } catch (error) {
    console.error("Error fetching all complaints:", error);

    res.status(500).json({
      message: "Error fetching complaints"
    });
  }
};



// Update complaint status (admin)
export const updateComplaintStatus = async (req, res) => {
  try {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.json(complaint);

  } catch (error) {
    console.error("Error updating complaint:", error);

    res.status(500).json({
      message: "Error updating complaint status"
    });
  }
};