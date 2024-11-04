import React, { useState, useEffect } from 'react';
import './Contact.css';
import Navbar from './Navbar';
const Contact = () => {
  const Images = [
    'https://media.istockphoto.com/id/1202248634/photo/business-technology-internet-and-network-concept-technical-support-center-customer-service.jpg?s=612x612&w=0&k=20&c=bv1fa-QxA5cMSQu00TviV_XSu2WmVnaDaLWvGf5KR6o=',
    'https://media.istockphoto.com/id/955080528/photo/businesswoman-works-with-emails.jpg?s=612x612&w=0&k=20&c=MnBkjt-x8QOP2JbhsI2aQVlG5Ez69qsVIqY8uK-Uimw=',
    'https://media.istockphoto.com/id/466506291/photo/emailing.jpg?s=612x612&w=0&k=20&c=H2-BPEzgmaQAHjk980EXVHcvybKS1b845uwbqC4PLNU='
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [Images.length]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('contactFormData', JSON.stringify(formData));

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <Navbar/>
      <div className="contact-content">
        <div className="left-section">
          <img
            src={Images[currentIndex]}
            alt="Contact Us"
            className="contact-image"
          />
        </div>
        <div className="right-section">
          <h1 className="form-title">Get in Touch</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label className="form-label">Name</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className="form-label">Email</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <label className="form-label">Subject</label>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                className="form-input"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <label className="form-label">Message</label>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Thank You! Your message has been sent successfully.</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
