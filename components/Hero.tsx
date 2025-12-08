import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 max-w-4xl"
      >
        <h2 className="text-cyan-400 tracking-[0.2em] text-sm md:text-base font-semibold uppercase mb-4 neon-text-blue">
          Mastering the Night Sky
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6 drop-shadow-2xl">
          The Astrophotography <br /> Website
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The art of capturing the unseen. To photograph the cosmos is to wage war 
          against Earth's rotation and the scarcity of light itself.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10"
      >
        <a href="#disciplines" className="flex flex-col items-center text-slate-400 hover:text-white transition-colors">
          <span className="text-sm mb-2 uppercase tracking-widest">Begin Transmission</span>
          <ArrowDown className="animate-bounce w-6 h-6" />
        </a>
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80" />
    </section>
  );
};

export default Hero;