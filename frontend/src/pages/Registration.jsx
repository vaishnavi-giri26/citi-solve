import React, { useState } from "react";
import "../styles/Registration.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api.js";

const Registration = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen"
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: ""
      }));
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {

      const response = await authAPI.register(formData);

      console.log("Registration successful:", response);

      // save user + token
      login(response);

      navigate("/");

    } catch (error) {

      console.error("Registration failed:", error);

      setErrorMessage(
        error.response?.data?.message || "Registration failed"
      );

    } finally {

      setIsLoading(false);

    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <p className="register-subtitle">
          Join our citizen resolution system
        </p>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="error-text">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-text">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="login-link">
          Already have an account?
          <a href="/login"> Sign In</a>
        </div>

      </div>

    </div>
  );
};

export default Registration;