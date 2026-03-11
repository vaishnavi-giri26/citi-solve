import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🏛️</span>
        <span className="logo-text">CitiSolve</span>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
          </>
        ) : (
          <>
            {user.role === "user" && (
              <>
                <Link to="/submit-complaint">Submit Complaint</Link>
                <Link to="/my-complaints">My Complaints</Link>
              </>
            )}

            {user.role === "admin" && (
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            )}

            <span className="welcome">Welcome, {user.name}</span>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;