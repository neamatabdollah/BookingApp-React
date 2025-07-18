import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1>404</h1>
      <h3>Oops! Page Not Found</h3>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/home" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
