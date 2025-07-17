import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("bookingUser"));

  const handleLogout = () => {
    localStorage.removeItem("bookingUser");
    navigate("/login");
  };

  return (
    <div
      className="bg-light p-3"
      style={{ minHeight: "100vh", width: "200px" }}
    >
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/explore">
            Explore
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/support">
            Support
          </Link>
        </li>

        {!user && (
          <li className="nav-item mt-4">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </li>
        )}

        {user && (
          <>
            <li className="nav-item mt-4">
              <Link className="nav-link" to="/my-bookings">
                My Bookings
              </Link>
            </li>
            <li className="nav-item mt-2">
              <button
                className="btn btn-outline-danger w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
