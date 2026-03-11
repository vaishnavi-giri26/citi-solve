import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ComplaintForm.css";
import { complaintsAPI } from "../services/api";

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ward: "",
    location: "",
    category: "",
    description: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Roads & Infrastructure",
    "Water Supply",
    "Sanitation & Waste",
    "Street Lighting",
    "Public Safety",
    "Environmental Issues",
    "Noise Pollution",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.ward.trim()) newErrors.ward = "Ward is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Please select a category";

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await complaintsAPI.createComplaint({
        name: formData.name,
        ward: formData.ward,
        location: formData.location,
        category: formData.category,
        description: formData.description,
      });

      alert("Complaint submitted successfully");

      setFormData({
        name: "",
        ward: "",
        location: "",
        category: "",
        description: "",
        photo: null,
      });

      navigate("/my-complaints");
    } catch (error) {
      console.error(error);
      alert("Server error while submitting complaint");
    }
  };

  const handleCancel = () => {
    navigate("/my-complaints");
  };

  return (
    <div className="complaint-form-container">
      <div className="complaint-form-card">
        <h2>Submit a Complaint</h2>

        <form onSubmit={handleSubmit} className="complaint-form">
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Ward *</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
            />
            {errors.ward && <span className="error-text">{errors.ward}</span>}
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <span className="error-text">{errors.location}</span>
            )}
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error-text">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label>Photo (Optional)</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
