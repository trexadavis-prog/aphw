import React from 'react';
import { motion } from 'framer-motion';
import { DISCIPLINES } from '../constants';
import { ChevronRight } from 'lucide-react';

const Disciplines: React.FC = () => {
  return (
    <section id="disciplines" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Three Disciplines</h2>
        <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DISCIPLINES.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group glass-panel rounded-2xl overflow-hidden flex flex-col relative"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="h-48 relative overflow-hidden">
               {/* Simulating image load with gradient/icon since I cannot load real heavy images effectively */}
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                 <item.icon className="w-16 h-16 text-slate-600 group-hover:text-purple-400 transition-colors duration-300" />
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <item.icon className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="mt-auto space-y-2">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <ChevronRight className="w-3 h-3 text-cyan-500 mt-1 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Disciplines;
