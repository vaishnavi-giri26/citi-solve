import { useEffect, useState } from "react";
import { complaintsAPI } from "../services/api";

const AllComplaints = () => {

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

  const updateStatus = async (id, status) => {
    try {

      await complaintsAPI.updateStatus(id, status);
      fetchComplaints(); // refresh after update

    } catch (error) {

      console.log("Error updating status:", error);

    }
  };

  return (

    <div className="all-complaints-container">

      <h2>All Complaints</h2>

      {complaints.length === 0 ? (

        <p>No complaints found</p>

      ) : (

        <div>

          {complaints.map((complaint) => (

            <div key={complaint._id} className="complaint-card">

              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Ward:</strong> {complaint.ward}</p>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Description:</strong> {complaint.description}</p>

              <p>
                <strong>Status:</strong>

                <select
                  value={complaint.status}
                  onChange={(e) =>
                    updateStatus(complaint._id, e.target.value)
                  }
                >

                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>

                </select>

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default AllComplaints;