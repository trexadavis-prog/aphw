import React from 'react';
import StarField from './StarField';
import Navigation from './Navigation';
import Hero from './Hero';
import Disciplines from './Disciplines';
import GearGuide from './GearGuide';
import Calibration from './Calibration';
import Workflow from './Workflow';
import Footer from './Footer';
import ShutterSpeedCalculator from './ShutterSpeedCalculator';
import backgroundSvg from '../background.svg';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Image */}
      <img
        src={backgroundSvg}
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
        <ShutterSpeedCalculator />
        <Calibration />
        <Workflow />
      </main>

      <Footer />
    </div>
  );
};

export default Home;