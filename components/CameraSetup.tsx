import React from 'react';
import { Camera, ChevronLeft, Aperture, Clock, Gauge, Focus, Sliders, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const CameraSetup: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div className="flex items-center gap-3">
                        <Camera className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] tracking-wider text-white">
                            CAMERA <span className="text-cyan-400">SETUP</span>
                        </h1>
                    </div>
                    <a href="/" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> Return to Database
                    </a>
                </header>

                {/* Main Content */}
                <div className="space-y-8">

                    {/* Intro */}
                    <div className="glass-panel p-8 rounded-2xl border-l-4 border-cyan-400">
                        <h2 className="text-xl font-bold text-white mb-4">The Golden Rule: Manual Everything</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Astrophotography requires complete control. Auto modes will fail because the night sky is too dark for your camera's metering system to understand. You must switch your camera dial to <strong>'M' (Manual)</strong> and take control of every photon.
                        </p>
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* File Format */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-900/30 rounded-lg text-purple-400">
                                    <Sliders className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">File Format</h3>
                            </div>
                            <div className="text-3xl font-bold text-purple-400 mb-2">RAW</div>
                            <p className="text-sm text-slate-400">
                                <span className="text-red-400 font-bold">NEVER SHOOT JPEG.</span> RAW files contain the uncompressed sensor data needed to pull detail from the shadows during post-processing.
                            </p>
                        </motion.div>

                        {/* Focus */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-cyan-900/30 rounded-lg text-cyan-400">
                                    <Focus className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Focus Mode</h3>
                            </div>
                            <div className="text-3xl font-bold text-cyan-400 mb-2">Manual (MF)</div>
                            <p className="text-sm text-slate-400">
                                Autofocus will hunt forever in the dark. Switch to MF, use Live View, zoom in digitally on a bright star, and adjust until the star is as small and sharp as possible.
                            </p>
                        </motion.div>

                        {/* Aperture */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-yellow-900/30 rounded-lg text-yellow-400">
                                    <Aperture className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Aperture</h3>
                            </div>
                            <div className="text-3xl font-bold text-yellow-400 mb-2">Wide Open</div>
                            <p className="text-sm text-slate-400">
                                Use the lowest f-number (e.g., f/1.4, f/2.8) to gather maximum light.
                                <em className="block mt-2 text-xs text-slate-500">Pro Tip: Stop down slightly (e.g., f/1.4 → f/2.0) to reduce coma/vignetting if your lens isn't premium.</em>
                            </p>
                        </motion.div>

                        {/* ISO */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-900/30 rounded-lg text-green-400">
                                    <Gauge className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">ISO</h3>
                            </div>
                            <div className="text-3xl font-bold text-green-400 mb-2">1600 - 3200</div>
                            <p className="text-sm text-slate-400">
                                Start at ISO 1600. This amplification is necessary to see the faint stars. Going too high (6400+) introduces too much noise on older sensors.
                            </p>
                        </motion.div>

                        {/* Shutter Speed */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="md:col-span-2 bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-900/30 rounded-lg text-orange-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Shutter Speed</h3>
                            </div>
                            <div className="text-3xl font-bold text-orange-400 mb-2">Calculated (NPF)</div>
                            <p className="text-sm text-slate-400">
                                This is the trickiest setting. If the shutter is open too long, stars will trail due to Earth's rotation. Use the <strong className="text-white">Shutterspeed Calculator</strong> on the homepage to find your exact limit (usually 10-20 seconds for wide lenses).
                            </p>
                        </motion.div>

                        {/* White Balance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="md:col-span-2 bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-start gap-6"
                        >
                            <div className="p-2 bg-slate-700/50 rounded-lg text-white flex-shrink-0">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Other Critical Settings</h3>
                                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                    <li><strong className="text-slate-200">White Balance:</strong> Set to 'Daylight' or ~4500K-5000K (Consisent colors for stacking).</li>
                                    <li><strong className="text-slate-200">Long Exposure Noise Reduction:</strong> <span className="text-red-400 font-bold">OFF</span>. This doubles your shooting time and interferes with dark frames.</li>
                                    <li><strong className="text-slate-200">Image Stabilization (IBIS/OS):</strong> <span className="text-red-400 font-bold">OFF</span>. The tripod handles stability; IS can cause blur when on a tripod.</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center text-slate-500 text-sm mt-12 pb-12">
                        Always engage the 2-second timer or use a remote release to prevent camera shake when pressing the shutter button.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CameraSetup;
