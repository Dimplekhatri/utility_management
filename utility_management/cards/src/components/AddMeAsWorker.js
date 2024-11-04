import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import './AddMeAsWorker.css'; // Import the CSS file
import Navbar from './Navbar';
const AddMeAsWorkerPage = () => {
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming you store JWT in localStorage
       
      const response = await axios.post(
        'http://localhost:5000/api/addSelfAsWorker',
        { type, address },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="worker-form-container">
      <h1 className="form-title" style={{color:"#3A1078"}}>Add Me as a Worker</h1>
      <form onSubmit={handleSubmit} className="worker-form">
        <div className="form-group">
          <label htmlFor="type" style={{color:"black"}}>Worker Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="electrician">Electrician</option>
            <option value="carpenter">Carpenter</option>
            <option value="network technician">Network Technician</option>
            <option value="plumber">Plumber</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address" style={{color:"black"}}>Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button" style={{background:"#3A1078"}}>Submit</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
    < Footer/>z
    </>
  );
};

export default AddMeAsWorkerPage;
