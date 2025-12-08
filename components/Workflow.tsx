import React from 'react';
import { motion } from 'framer-motion';
import { WORKFLOW_STEPS } from '../constants';

const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Workflow</h2>
          <p className="text-slate-400">From photon collection to final image.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 md:-translate-x-1/2" />

          <div className="space-y-12">
            {WORKFLOW_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Spacer for desktop layout alignment */}
                  <div className="hidden md:block w-5/12" />

                  {/* Icon/Dot container */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-4 border-slate-900 z-10 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${step.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="ml-12 md:ml-0 md:w-5/12 glass-panel p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className={`flex items-center gap-3 mb-3 ${step.color}`}>
                      <step.icon className="w-5 h-5" />
                      <h3 className="text-lg font-bold uppercase tracking-wide">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
