import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Experience from './Experience';
import Hobbies from './Hobbies';
import Projects from './Projects';

import logo from './logo.svg';
import './App.css';

// Use for routing
function App() {
  return (
    <div className='App'>
      <Router basename="/wal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Experience" element={<Experience />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Hobbies" element={<Hobbies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
