import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true });
      console.log("Logout successful:", response.data);
      navigate('/'); // Redirect to login page after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">Employee Details</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/employeeslist' ? 'active' : ''}`}
                to="/employeeslist"
              >
                Employees List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/createemployee' ? 'active' : ''}`}
                to="/createemployee"
              >
                Create Employee
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
