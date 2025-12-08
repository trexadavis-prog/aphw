import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Info, MoreHorizontal, Settings2 } from 'lucide-react';

const ShutterSpeedCalculator: React.FC = () => {
    const [focalLength, setFocalLength] = useState<number>(14);
    const [aperture, setAperture] = useState<number>(2.8);
    const [pixelPitch, setPixelPitch] = useState<number>(5.9); // Default to Full Frame avg
    const [shutterSpeed, setShutterSpeed] = useState<string>('0');
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [selectedSensor, setSelectedSensor] = useState<string>('full-frame');

    // Standard estimations for "Safe" NPF calculations (conservative)
    // These are approximations of common sensors in these categories
    const SENSOR_SIZES = [
        { id: 'mft', label: 'Micro 4/3', pitch: 3.33 },        // ~20MP
        { id: 'apsc', label: 'APS-C', pitch: 3.92 },           // ~26MP
        { id: 'full-frame', label: 'Full Frame', pitch: 5.93 }, // ~24MP
        { id: 'medium', label: 'Medium Format', pitch: 3.76 }   // ~100MP
    ];

    const handleSensorSelect = (id: string, pitch: number) => {
        setSelectedSensor(id);
        setPixelPitch(pitch);
    };

    const handleManualPitchChange = (val: number) => {
        setPixelPitch(val);
        setSelectedSensor('custom');
    };

    // NPF Rule: (35 × Aperture + 30 × Pixel Pitch) ÷ Focal Length = Max Shutter Speed
    useEffect(() => {
        if (focalLength > 0) {
            const npf = ((35 * aperture) + (30 * pixelPitch)) / focalLength;
            setShutterSpeed(npf.toFixed(1));
        }
    }, [focalLength, aperture, pixelPitch]);

    return (
        <section id="calculator" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                    <Calculator className="w-8 h-8 text-cyan-400" />
                    Shutter Time Calculator
                </h2>
                <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
                    Calculate the maximum exposure time before stars begin to trail using the NPF Rule.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Input Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 rounded-2xl relative"
                >
                    {/* Advanced Toggle */}
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="absolute top-6 right-6 p-2 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-full transition-colors"
                        title="Advanced Settings"
                    >
                        <MoreHorizontal className="w-6 h-6" />
                    </button>

                    <div className="space-y-8">
                        {/* Focal Length Input */}
                        <div>
                            <label className="flex items-center justify-between text-slate-200 font-medium mb-2">
                                <span>Focal Length (mm)</span>
                                <span className="text-cyan-400 font-mono">{focalLength}mm</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="300"
                                step="1"
                                value={focalLength}
                                onChange={(e) => setFocalLength(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>10mm</span>
                                <span>300mm</span>
                            </div>
                        </div>

                        {/* Aperture Input */}
                        <div>
                            <label className="flex items-center justify-between text-slate-200 font-medium mb-2">
                                <span>Aperture (f/)</span>
                                <span className="text-cyan-400 font-mono">f/{aperture}</span>
                            </label>
                            <input
                                type="range"
                                min="1.2"
                                max="16"
                                step="0.1"
                                value={aperture}
                                onChange={(e) => setAperture(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>f/1.2</span>
                                <span>f/16</span>
                            </div>
                        </div>

                        {/* Sensor Selection (Simplified) */}
                        <div>
                            <label className="block text-slate-200 font-medium mb-3">Sensor Size</label>
                            <div className="grid grid-cols-2 gap-3">
                                {SENSOR_SIZES.map((sensor) => (
                                    <button
                                        key={sensor.id}
                                        onClick={() => handleSensorSelect(sensor.id, sensor.pitch)}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${selectedSensor === sensor.id
                                                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                            }`}
                                    >
                                        {sensor.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Advanced Pixel Pitch Input (Hidden by default) */}
                        <AnimatePresence>
                            {showAdvanced && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 border-t border-slate-700/50">
                                        <div className="flex items-center gap-2 mb-3 text-cyan-400 text-sm font-semibold uppercase tracking-wider">
                                            <Settings2 className="w-4 h-4" />
                                            Advanced: Pixel Pitch
                                        </div>

                                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <label className="text-slate-300 text-sm">Custom Pixel Pitch (µm)</label>
                                                <div className="group relative">
                                                    <Info className="w-3 h-3 text-slate-500 cursor-help" />
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                                        Exact pixel size affects calculation.
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    step="0.01"
                                                    value={pixelPitch}
                                                    onChange={(e) => handleManualPitchChange(Number(e.target.value))}
                                                    className="bg-slate-950 border border-slate-700 text-white rounded px-3 py-2 w-full focus:outline-none focus:border-cyan-500 text-sm"
                                                />
                                                <span className="text-slate-500 text-xs whitespace-nowrap">
                                                    {selectedSensor === 'custom' ? '(Custom)' : `(Est. ${SENSOR_SIZES.find(s => s.id === selectedSensor)?.label})`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Result Display */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative h-full"
                >
                    <div className="p-1 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 h-full">
                        <div className="bg-slate-950 p-10 rounded-2xl flex flex-col items-center justify-center text-center h-full relative overflow-hidden">
                            {/* Inner glow */}
                            <div className="absolute inset-0 bg-cyan-500/5" />

                            <h3 className="text-slate-400 uppercase tracking-widest text-sm font-semibold mb-4 relative z-10">
                                Max Shutter Speed
                            </h3>

                            <div className="text-7xl font-bold text-white mb-2 relative z-10 font-[Space_Grotesk]">
                                {shutterSpeed}<span className="text-3xl text-cyan-400">s</span>
                            </div>

                            <div className="mt-8 space-y-2 relative z-10">
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Params</div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="px-2 py-1 bg-slate-900 rounded text-xs text-cyan-300 border border-cyan-900/30">
                                        {selectedSensor === 'custom' ? 'Custom Sensor' : SENSOR_SIZES.find(s => s.id === selectedSensor)?.label}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-400 border border-slate-800">
                                        {focalLength}mm
                                    </span>
                                    <span className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-400 border border-slate-800">
                                        f/{aperture}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ShutterSpeedCalculator;
