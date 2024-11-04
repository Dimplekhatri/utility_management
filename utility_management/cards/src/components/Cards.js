import React, { useState } from 'react';
import Info from './Info';

const cardsData = [
  {
    name: "Carpenter",
    photoName: "/images/c1.jpeg",
    paragraph: "Our skilled carpenters provide top-notch woodworking and furniture services. From custom furniture to home repairs, we handle it all.",
    button: "Contact us",
  },
  {
    name: "Electrician",
    photoName: "/images/e1.jpeg",
    paragraph: "Our certified electricians ensure safe and efficient electrical installations and repairs. Whether it's wiring, lighting, or troubleshooting, we've got you covered.",
    button: "Contact us",
  },
  {
    name: "Plumber",
    photoName: "/images/p1.jpg",
    paragraph: "Our experienced plumbers offer reliable plumbing services including leak repairs, pipe installations, and maintenance. We're here to solve all your plumbing issues.",
    button: "Contact us",
  },
  {
    name: "Firefighter",
    photoName: "/images/fi1.jpeg",
    paragraph: "Our dedicated firefighters are trained to handle emergencies and ensure your safety. From fire prevention to emergency response, we are always ready.",
    button: "Contact us",
  },
  {
    name: "Network Technician",
    photoName: "/images/n1.jpeg",
    paragraph: "Our network technicians provide comprehensive networking solutions including setup, maintenance, and troubleshooting of network systems to keep you connected.",
    button: "Contact us",
  }
];

function Cards() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + cardsData.length) % cardsData.length);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  };

  const visibleCards = [
    cardsData[startIndex],
    cardsData[(startIndex + 1) % cardsData.length],
    cardsData[(startIndex + 2) % cardsData.length],
  ];

  return (
    <div className="main-container">
      <button onClick={handlePrevious}>&lt;</button>
      <ul>
        {visibleCards.map((person, index) => (
          <li className={index === 0 ? 'highlighted' : ''} key={person.name}>
            <Info personObj={person} />
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
}
export default Cards;

