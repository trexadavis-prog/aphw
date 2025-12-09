import React from 'react';
import { Stars, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-slate-200 font-bold tracking-wider">
          <Stars className="w-5 h-5 text-purple-400" />
          NIGHTLIGHTS ASTROPHOTOGRAPHY
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#/about"
            className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
          >
            About Me
          </a>
          <a
            href="https://instagram.com/trex.nightlights"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-medium">trex.nightlights</span>
          </a>
        </div>

        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Educational Purpose Only.
        </div>
      </div>
    </footer>
  );
};

export default Footer;