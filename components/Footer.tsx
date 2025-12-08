import React from 'react';
import { Stars } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-slate-200 font-bold tracking-wider">
          <Stars className="w-5 h-5 text-purple-400" />
          THE ASTROPHOTOGRAPHY WEBSITE
        </div>
        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Educational Purpose Only.
        </div>
        <div className="flex gap-4">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;