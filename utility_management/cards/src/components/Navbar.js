import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GrUserWorker } from "react-icons/gr";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <nav className="navbar-item">
      <h1 className="logo">
        SnapServe
      </h1>
      <div className="menu-icons" onClick={toggleMenu}>
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/" className="nav-links">
            <i className="fa-solid fa-house-user"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/services" className="nav-links">
            <i className="fa-solid fa-briefcase"></i> Services
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="nav-links">
            <i className="fa-solid  bold"></i> <GrUserWorker />Add me as Worker
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-links">
            <i className="fa-solid fa-circle-info"></i> About us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-links">
            <i className="fa-solid fa-address-book"></i> Contact us
          </Link>
        </li>
        <li>
          <Link to="/faq" className="nav-links">
            <i className="fa-solid fa-question-circle"></i> FAQ
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-links">
            <i className="fa-solid fa-user"></i> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;





