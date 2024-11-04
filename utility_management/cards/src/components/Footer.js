// Footer.jsx
import React from 'react';
import './Footer.css'; 
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4><Link to='/about'>About Us</Link></h4>
          <p>We try our best to provide you better services.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/services'>Services</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4><Link to='/contact'>Contact Us</Link></h4>
          <p>Email: snapServe@gmail.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
