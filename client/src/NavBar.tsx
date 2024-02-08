import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ paddingLeft: '20px' }}>
      <Link className="navbar-brand" to="/">Website Name</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/lost">Lost & Found</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/adopt">Adoption</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/forum">Forum</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Calendar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">My Pet Account</Link>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;
