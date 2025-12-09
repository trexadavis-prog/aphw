import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MoonCalendar from './components/MoonCalendar';
import CameraSetup from './components/CameraSetup';
import StarMap from './components/StarMap';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moon-calendar" element={<MoonCalendar />} />
        <Route path="/camera-setup" element={<CameraSetup />} />
        <Route path="/star-map" element={<StarMap />} />
      </Routes>
    </Router>
  );
};

export default App;