import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CALIBRATION_FRAMES } from '../constants';
import { ChevronDown, Info } from 'lucide-react';

const Calibration: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="calibration" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
          <Info className="w-3 h-3" />
          SIGNAL-TO-NOISE RATIO OPTIMIZATION
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Data Integrity & Calibration</h2>
        <p className="text-slate-400">
          Raw astronomical data is inherently noisy. Calibration frames are the mathematical subtraction of error from signal.
        </p>
      </motion.div>

      <div className="space-y-4">
        {CALIBRATION_FRAMES.map((frame, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                overflow-hidden rounded-xl border transition-all duration-300
                ${isOpen 
                  ? 'bg-slate-900/80 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }
              `}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isOpen ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-400'}`}>
                    <frame.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                      {frame.title}
                    </h3>
                    {!isOpen && <p className="text-xs text-slate-500 mt-1 truncate max-w-[200px] md:max-w-md">{frame.description}</p>}
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 ml-16 md:ml-20 border-l border-purple-500/20">
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {frame.description}
                      </p>
                      <div className="bg-black/40 rounded-lg p-4">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">Acquisition Method</span>
                        <p className="text-sm text-slate-400 font-mono">
                          {frame.method}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Calibration;
