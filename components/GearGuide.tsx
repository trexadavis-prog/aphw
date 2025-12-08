import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEAR_CATEGORIES } from '../constants';
import { Activity, Aperture, Camera } from 'lucide-react';

const GearGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState(GEAR_CATEGORIES[0].id);

  const activeContent = GEAR_CATEGORIES.find((c) => c.id === activeTab);

  const getIcon = (id: string) => {
    switch(id) {
      case 'mounts': return <Activity className="w-4 h-4 mr-2" />;
      case 'cameras': return <Camera className="w-4 h-4 mr-2" />;
      case 'optics': return <Aperture className="w-4 h-4 mr-2" />;
      default: return null;
    }
  };

  return (
    <section id="gear" className="py-24 px-6 relative bg-slate-900/30">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Gear Intelligence</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Astrophotography requires specialized tools designed to push the boundaries of physics.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {GEAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                relative px-6 py-3 rounded-full flex items-center text-sm font-medium transition-all duration-300 border
                ${activeTab === cat.id 
                  ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                  : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
                }
              `}
            >
              {getIcon(cat.id)}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeContent && (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2 neon-text-blue">{activeContent.title}</h3>
                  <p className="text-slate-300 mb-8 italic text-lg border-l-2 border-cyan-500/30 pl-4">
                    {activeContent.content}
                  </p>
                  
                  {activeContent.technicalNote && (
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-xs text-slate-400 font-mono mb-6">
                      <span className="text-cyan-500 font-bold block mb-1">ACCESSING DATA NODE:</span>
                      {activeContent.technicalNote}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {activeContent.comparison.map((item, idx) => (
                    <div key={idx} className="group p-5 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all duration-300">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-shadow"></span>
                        {item.label}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default GearGuide;
