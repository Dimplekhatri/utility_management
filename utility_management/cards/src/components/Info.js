import React from 'react';
import { Link } from 'react-router-dom';

function Info({ personObj }) {
  return (
    <div className="card">
      <img src={personObj.photoName} alt={personObj.name} />
      <h2>{personObj.name}</h2>
      <p>{personObj.paragraph}</p>
      <Link to={`/workers/${personObj.name.toLowerCase()}`} className="btn">
        {personObj.button}
      </Link>
    </div>
  );
}

export default Info;
