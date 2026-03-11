import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import "../styles/Login.css";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await authAPI.login({
        email,
        password
      });

      console.log("Login successful:", data);

      if (!data) {
        throw new Error("No data returned from server");
      }

      // store user in AuthContext
      login(data);

      // redirect based on role
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {

      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;