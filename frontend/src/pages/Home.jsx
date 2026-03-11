
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Citizen Resolution System</h1>
        <p>
          Report and track community issues efficiently. Your voice matters in
          building a better community.
        </p>

        {!user && (
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn-outline">
              Register
            </Link>
          </div>
        )}

        {user?.role === "citizen" && (
          <div className="hero-buttons">
            <Link to="/submit-complaint" className="btn-primary">
              Submit Complaint
            </Link>
            <Link to="/my-complaints" className="btn-outline">
              My Complaints
            </Link>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="hero-buttons">
            <Link to="/all-complaints" className="btn-primary">
              View All Complaints
            </Link>
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <div className="circle">1</div>
            <h4>Register</h4>
            <p>Create your account as a citizen</p>
          </div>

          <div className="step">
            <div className="circle">2</div>
            <h4>Submit</h4>
            <p>Report issues with details and photos</p>
          </div>

          <div className="step">
            <div className="circle">3</div>
            <h4>Track</h4>
            <p>Monitor progress and status updates</p>
          </div>
        </div>
      </section>

      {/* READY TO GET STARTED */}
      <section className="ready-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our community and help make a difference</p>

        {!user && (
          <div className="ready-buttons">
            <Link to="/register" className="btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="btn-outline">
              Sign In
            </Link>
          </div>
        )}

        {user?.role === "citizen" && (
          <div className="ready-buttons">
            <Link to="/submit-complaint" className="btn-primary">
              Submit Complaint
            </Link>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="ready-buttons">
            <Link to="/all-complaints" className="btn-primary">
              Manage Complaints
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;