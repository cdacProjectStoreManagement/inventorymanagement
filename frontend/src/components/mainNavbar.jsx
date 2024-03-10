// mainNavbar.js
import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useUser } from '../services/UserContext';

function MainNavbar() {
  const { user } = useUser();

  return (
    <div>
      <nav className="navbar bg-dark text-light">
        <div className="container-fluid">
          <img src={logo} alt="Logo" height="50" className="d-inline-block align-text-top" />
          <h5>
            <b>Store Inventory Manager</b>
          </h5>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" aria-current="page">
                About
              </Link>
            </li>
            {user ? (
              // If user is authenticated, show user-related links
              <>
                <li className="nav-item">
                  <Link to="/user" className="nav-link" aria-current="page">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signout" className="nav-link" aria-current="page">
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              // If user is not authenticated, show login-related links
              <>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link" aria-current="page">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" aria-current="page">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default MainNavbar;
