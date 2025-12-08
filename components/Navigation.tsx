import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#disciplines', label: 'Disciplines' },
    { href: '#gear', label: 'Gear' },
    { href: '#calculator', label: 'Calculator' },
    { href: '#calibration', label: 'Calibration' },
    { href: '#workflow', label: 'Workflow' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-xl font-bold font-['Space_Grotesk'] tracking-wider text-white flex items-center gap-2">
          NIGHTLIGHTS
        </a>

        {/* Desktop Nav - Hidden as links moved to Hero, but reused for Calendar Button */}
        <div className="hidden md:flex gap-8">
          <Link
            to="/moon-calendar"
            className="text-sm font-medium text-cyan-400 hover:text-white border border-cyan-500/50 rounded-full px-4 py-2 transition-all hover:bg-cyan-900/50 flex items-center gap-2"
          >
            <span>2026 Moon Calendar</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          <Link
            to="/moon-calendar"
            onClick={() => setMobileMenuOpen(false)}
            className="text-cyan-400 font-medium py-2 border-b border-white/5 uppercase text-sm tracking-wider flex items-center gap-2"
          >
            <span>2026 Moon Calendar</span>
          </Link>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5 uppercase text-sm tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;