import React, { useEffect, useState } from "react";
import { complaintsAPI } from "../services/api";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      // get logged-in user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      const data = await complaintsAPI.getComplaints();

      // filter complaints belonging to this user
      const myComplaints = data.filter(
        (c) => c.user === storedUser._id || c.user?._id === storedUser._id
      );

      setComplaints(myComplaints);

    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        complaints.map((complaint) => (
          <div
            key={complaint._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <p><strong>Name:</strong> {complaint.name}</p>
            <p><strong>Ward:</strong> {complaint.ward}</p>
            <p><strong>Location:</strong> {complaint.location}</p>
            <p><strong>Category:</strong> {complaint.category}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Status:</strong> {complaint.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyComplaints;