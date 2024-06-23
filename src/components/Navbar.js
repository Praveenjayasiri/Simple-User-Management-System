import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import './Styles/Navbar.css';

const Navbar = () => {
  // Accessing user context and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu visibility

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login'); // Navigate to login page after logout
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand/logo with Font Awesome Icon */}
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faUser} className="me-2" /> User Management
        </Link>
        {/* Toggle button for small screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu} // Toggle menu visibility on button click
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar menu items */}
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Conditional rendering based on user authentication */}
            {user ? (
              // If user is authenticated
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                {/* Display admin panel link for admin users */}
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Panel</Link>
                  </li>
                )}
                {/* Logout button */}
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              // If user is not authenticated
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
