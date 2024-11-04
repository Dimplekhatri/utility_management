import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';  
import Footer from '../Footer';
import Navbar from '../Navbar';
const cardsData = [
  {
    name: "Carpenter",
    photoName: "/images/c1.jpeg",
    paragraph: "Our skilled carpenters provide top-notch woodworking and furniture services. From custom furniture to home repairs.",
    button: "Contact us",
  },
  {
    name: "Electrician",
    photoName: "/images/e1.jpeg",
    paragraph: "Our certified electricians ensure safe and efficient electrical installations and repairs.  ",
    button: "Contact us",
  },
  {
    name: "Plumber",
    photoName: "/images/p1.jpg",
    paragraph: "Our experienced plumbers offer reliable plumbing services including leak repairs, pipe installations, and maintenance.  ",
    button: "Contact us",
  },
 
  {
    name: "Network Technician",
    photoName: "/images/n1.jpeg",
    paragraph: "Our network technicians provide comprehensive networking solutions including setup, maintenance.",
    button: "Contact us",
  }
];

const Card = ({ name, photoName, paragraph, button }) => {
  const workerLink = name ? `/workers/${name.toLowerCase()}` : '#';

  return (
    <div className="card" style={{background:"whitesmoke"}}>
      <img src={photoName} alt={name || 'Worker'} className="card-img" />
      <div className="card-content">
        <h2 className="card-title" style={{color:"#3A1078"}}>{name}</h2>
        <p  className="card-paragraph" style={{color:"black"}}>{paragraph}</p>
        <Link
          to={workerLink}
          className="card-button"
        >
          {button}
        </Link>
      </div>
    </div>
  );
};

const Services = () => {
  return (

    <>
    <Navbar/>
    <div className="outer">
    <h1 style={{color:"#3A1078"}}>Our Services</h1>
    <div className="services-container">
      
      {cardsData.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          photoName={card.photoName}
          paragraph={card.paragraph}
          button={card.button}
        />
      ))}
    </div>
    </div>
    < Footer/>
    </>
  );
};

export default Services;
