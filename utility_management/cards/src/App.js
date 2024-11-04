import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services/Services.js';
import AddMeAsWorker from './components/AddMeAsWorker.js';
import About from './components/About';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Login from './components/Login';
import './App.css';
import  WorkerPage from './components/WorkerPage.js';

 
import Signup from './components/Signup.js';

function App() {
  return (
    <div className="App">
      <Routes>

      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/pricing' element={<AddMeAsWorker />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/login' element={<Login />} />
        <Route path="workers/:category" element={<WorkerPage/>} />
      </Routes>
    </div>
  );
}

export default App;
