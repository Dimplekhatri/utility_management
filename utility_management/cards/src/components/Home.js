import React from 'react';
import Navbar from './Navbar';
import Cards from './Cards';
import './Home.css';
import Footer from './Footer';
import  {Link}  from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <div className="main-page">
      <img src="/images/bc3.jpg" alt=""/>
      <h1 className="head">Transforming Neighborhoods with Intelligent Solutions – Your Smart Utility Partner.
        <br/>
        <Link to='/signup' className="button1">Sign Up</Link>
      </h1>
      <Navbar />
      </div>
      <div>
       
        <h1 className='heading'>Our Faculty</h1>
        <Cards/>
        
      </div>
     < Footer/>
      
    </div>
  );
};

export default Home;

