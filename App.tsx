import React from 'react';
import StarField from './components/StarField';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Disciplines from './components/Disciplines';
import GearGuide from './components/GearGuide';
import Calibration from './components/Calibration';
import Workflow from './components/Workflow';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Image - Please ensure 'background.jpg' is in your public folder */}
      <img 
        src="./background.jpg" 
        alt="Astrophotography Background"
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      />
      
      {/* StarField Overlay (Transparent) */}
      <StarField />
      
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <Disciplines />
        <GearGuide />
        <Calibration />
        <Workflow />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;