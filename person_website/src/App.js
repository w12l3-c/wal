import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Experience from './pages/Experience';
import Hobbies from './pages/Hobbies';
import Projects from './pages/Projects';

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
