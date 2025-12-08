import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MoonCalendar from './components/MoonCalendar';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moon-calendar" element={<MoonCalendar />} />
      </Routes>
    </Router>
  );
};

export default App;