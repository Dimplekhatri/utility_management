import React from 'react';
import './About.css';
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from '../assets/about.jpeg';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="div1">
          <h2>Welcome to Snap Serve!</h2>
          <p>We are dedicated to connecting you with top-notch professionals who can handle all your home and office needs.</p>
        </div>
        <div className="div2">
          <img src={img1} alt="About Snap Serve" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

