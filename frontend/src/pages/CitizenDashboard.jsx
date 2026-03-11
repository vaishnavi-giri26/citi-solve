import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { complaintsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await complaintsAPI.getComplaints();
        setComplaints(data || []);
        console.log(data)
      } catch (error) {
        console.log("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const totalReports = complaints.length;

  const pendingReports = complaints.filter(
    c => c.status === "Pending").length;

  const resolvedReports = complaints.filter(
    c => c.status === "Resolved").length;

    const InProgressReports = complaints.filter(
      c => c.status === "In Progress").length;
  

  return (
    <div className="dashboard-container">
      <h2>Welcome back, {user?.name}</h2>

      <div className="stats">
        <div className="card">
          <h3>Total Reports</h3>
          <p>{totalReports}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingReports}</p>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <p>{resolvedReports}</p>
        </div>
        <div className="card">
          <h3>In Progress</h3>
          <p>{InProgressReports}</p>
        </div>
      </div>

      <div className="actions">
        <Link to="/submit-complaint" className="btn-primary">
          Submit Complaint
        </Link>

        <Link to="/my-complaints" className="btn-secondary">
          View My Complaints
        </Link>
      </div>
    </div>
  );
};

export default CitizenDashboard;