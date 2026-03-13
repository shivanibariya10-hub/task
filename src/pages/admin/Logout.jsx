import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear admin authentication data
    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    // Redirect to admin login after 1.5 sec
    setTimeout(() => {
      navigate("/admin-login");
    }, 1500);

  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <div className="spinner"></div>
        <h2>Admin Logging Out...</h2>
        <p>Redirecting to login page</p>
      </div>
    </div>
  );
}

export default Logout;