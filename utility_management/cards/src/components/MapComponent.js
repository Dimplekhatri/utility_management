
import React, { useState } from 'react';
import { Map } from 'ola-maps-react';
import './MapComponent.css'

const MapComponent = () => {
    const [destination, setDestination] = useState('');
    const [center, setCenter] = useState({ lat: 28.7041, lng: 77.1025 }); // Default center (New Delhi)
    const apiKey = process.env.REACT_APP_OLA_MAPS_API_KEY;
  
    const handleInputChange = (event) => {
      setDestination(event.target.value);
    };
  
    const handleSearch = () => {
      const geocodedLocation = {
        'New Delhi': { lat: 28.7041, lng: 77.1025 },
        'Mumbai': { lat: 19.0760, lng: 72.8777 },
        'Bangalore': { lat: 12.9716, lng: 77.5946 },
        'Kolkata': { lat: 22.5726, lng: 88.3639 },
        'Chandigarh': { lat: 30.7333, lng: 76.7794 }
      };
  
      setCenter(geocodedLocation[destination] || center);
    };
  
    return (
      <div className="container">
        <div className="input-container">
          <label htmlFor="destination">Enter your location:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={handleInputChange}
            placeholder="Enter destination"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="map-container">
          <Map 
            zoom={10} 
            center={center}
            apiKey={apiKey}
            tilt={0} 
            heading={0}
          />
        </div>
      </div>
    );
  };
  
  export default MapComponent;