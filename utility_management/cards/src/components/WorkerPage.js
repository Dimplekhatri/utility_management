import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './WorkerPage.css';  
import Footer from './Footer';

const WorkerPage = () => {
  const { category } = useParams();
  const [workers, setWorkers] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/workers/${category}`);
        setWorkers(response.data);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, [category]);

  const handleBooking = async (workerId) => {
    try {
      const token = localStorage.getItem('token');  

      const response = await axios.post(
        `http://localhost:5000/api/workers/${workerId}/book`,
        {
          date: selectedDate,
          userId: '66d04ce9deccf4c66cc394f4'  
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error booking worker:', error);
      alert('Error booking worker: ' + error.response.data.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className="worker-page-container">
     
      <div className="container mx-auto p-4">
        <h1 className="worker-page-title" style={{color:"#3A1078"}}>
          {category.charAt(0).toUpperCase() + category.slice(1)}s
        </h1>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={e => setSelectedDate(e.target.value)} 
          placeholder="Select Date" 
          className="date-input"
        />

        <ul className="worker-cards-container">
          {workers.length > 0 ? (
            workers.map(worker => (
              <li key={worker._id} className="worker-card">
                <div className="worker-card-content">
                  <h2 className="worker-card-title">{worker.name}</h2>
                  <p className="worker-card-address">Address: {worker.address}</p>

                  <p className="worker-card-booked-dates-title">Booked Dates:</p>
                  <ul className="worker-card-dates">
                    {worker.dates.length > 0 ? (
                      worker.dates.map((date, index) => (
                        <li key={index}>{new Date(date).toDateString()}</li>
                      ))
                    ) : (
                      <li>No dates booked</li>
                    )}
                  </ul>
                  <button 
                    onClick={() => handleBooking(worker._id)}
                    className="book-now-button"
                  >
                    Book Now
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No workers available in this category.</p>
          )}
        </ul>
      </div>
    </div>
    < Footer/>
    </>
  );
}

export default WorkerPage;
