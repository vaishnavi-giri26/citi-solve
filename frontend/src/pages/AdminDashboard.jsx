import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { complaintsAPI } from "../services/api";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {

      const data = await complaintsAPI.getComplaints();

      setComplaints(data || []);

    } catch (error) {

      console.log("Error fetching complaints:", error);

    }
  };

  const totalComplaints = complaints.length;

  const openComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (

    <div className="dashboard-container">

      <h2>Admin Dashboard</h2>

      <p>Manage and monitor all citizen complaints</p>

      <div className="stats">

        <div className="card">
          <h3>Total Complaints</h3>
          <p>{totalComplaints}</p>
        </div>

        <div className="card">
          <h3>Open</h3>
          <p>{openComplaints}</p>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <p>{inProgressComplaints}</p>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <p>{resolvedComplaints}</p>
        </div>

      </div>

      <button
        className="btn-primary"
        onClick={() => navigate("/all-complaints")}
      >
        View All Complaints
      </button>

    </div>

  );

};

export default AdminDashboard;