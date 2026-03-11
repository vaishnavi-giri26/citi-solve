import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./Components/Navbar";
import ComplaintForm from "./Components/ComplaintForm";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MyComplaints from "./pages/MyComplaints";
import AllComplaints from "./pages/AllComplaints";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/submit-complaint" element={<ComplaintForm />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/all-complaints" element={<AllComplaints />} />
        <Route path="/dashboard" element={<CitizenDashboard />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;