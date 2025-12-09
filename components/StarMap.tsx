import React, { useEffect, useState } from 'react';
import { Globe, ChevronLeft, Map as MapIcon, Compass } from 'lucide-react';

const StarMap: React.FC = () => {
    // Default to Flagstaff, AZ (Dark Sky City) as fallback
    const [coords, setCoords] = useState<{ lat: number; long: number } | null>(null);
    const [locationName, setLocationName] = useState<string>("Detecting Location...");
    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    });
                    const hemisphere = position.coords.latitude >= 0 ? "Northern" : "Southern";
                    setLocationName(`Live View • ${hemisphere} Hemisphere`);
                },
                (error) => {
                    console.error("Geolocation denied or error:", error);
                    setPermissionDenied(true);
                    // Fallback to Flagstaff
                    setCoords({ lat: 35.1983, long: -111.6513 });
                    setLocationName("Live View • Flagstaff, AZ (Default)");
                }
            );
        } else {
            console.log("Geolocation not supported");
            // Fallback
            setCoords({ lat: 35.1983, long: -111.6513 });
            setLocationName("Live View • Fallback Location");
        }
    }, []);

    const width = '100%';
    const height = '600px';

    // Construct URL only when coords are available
    // Added cardinalpoints for compass, az=0 to look North.
    // Attempting to inject "NORTH STAR" label via objects param (might be ignored by some LCO versions but worth a try)
    const northStarObj = encodeURIComponent(JSON.stringify([{
        "name": "NORTH STAR",
        "ra": 37.95,
        "dec": 89.26,
        "mag": 1.0
    }]));

    const embedUrl = coords
        ? `https://virtualsky.lco.global/embed/index.html?longitude=${coords.long}&latitude=${coords.lat}&projection=stereo&constellations=true&constellationlabels=true&meteorshowers=true&showstarlabels=true&live=true&az=0&cardinalpoints=true&gridlines_az=true&background=020617&colors=cyan&objects=${northStarObj}`
        : "";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <Globe className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] tracking-wider text-white">
                            INTERACTIVE <span className="text-cyan-400">SKY MAP</span>
                        </h1>
                    </div>
                    <a href="/" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> Return to Database
                    </a>
                </header>

                <div className="glass-panel p-1 rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl shadow-cyan-900/10 bg-slate-900 min-h-[60vh]">
                    {/* Top Left: North Star Indicator (Moved to Bottom Left above footer) */}
                    <div className="absolute bottom-8 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded text-xs text-yellow-400 border border-yellow-500/30 flex items-center gap-2 pointer-events-none shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        <span className="font-bold tracking-wide">NORTH STAR (Polaris)</span>
                    </div>

                    {/* Top Right: Live View Status */}
                    <div className="absolute top-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded text-xs text-slate-400 border border-slate-800 flex items-center gap-2 pointer-events-none transition-all">
                        <Compass className="w-3 h-3 text-cyan-500" />
                        <span>{locationName}</span>
                    </div>

                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            style={{ width: '100%', height: '70vh', border: 'none' }}
                            title="Interactive Star Map"
                            allow="geolocation"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[70vh] text-cyan-400 animate-pulse">
                            <Globe className="w-12 h-12 mb-4" />
                            <span className="text-lg font-['Space_Grotesk']">Calibrating Astrometrics...</span>
                        </div>
                    )}

                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <MapIcon className="w-5 h-5 text-purple-400" /> Constellations
                        </h3>
                        <p className="text-sm text-slate-400">
                            The map highlights the 88 modern constellations. Use this to identify key navigational stars like Polaris, Sirius, and Betelgeuse.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-cyan-400" /> Live Tracking
                        </h3>
                        <p className="text-sm text-slate-400">
                            The chart updates in real-time to reflect the Earth's rotation. What you see here matches the view from a dark sky location.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Compass className="w-5 h-5 text-yellow-400" /> Navigation
                        </h3>
                        <p className="text-sm text-slate-400">
                            Drag to pan around the sky. Scroll to zoom in/out. Click on stars to see their names and magnitude.
                        </p>
                    </div>
                </div>

                {/* Star Tracker Calibration Guide */}
                <div className="mt-12 border-t border-slate-800 pt-12">
                    <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mb-8 text-center">
                        Star Tracker <span className="text-cyan-400">Calibration</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Compass className="w-5 h-5 text-cyan-400" /> Finding North
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    For accurate tracking, your mount's axis must align with Earth's rotational axis. In the Northern Hemisphere, this points almost directly at <strong>Polaris (The North Star)</strong>.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex gap-2">
                                        <span className="text-cyan-500 font-bold">1.</span>
                                        <span>Locate the <strong>Big Dipper</strong> (Ursa Major).</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cyan-500 font-bold">2.</span>
                                        <span>Find the two "Pointer Stars" at the end of the cup.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-cyan-500 font-bold">3.</span>
                                        <span>Draw an imaginary line extending roughly 5x the distance between them to find the bright star <strong>Polaris</strong>.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Compass className="w-5 h-5 text-purple-400" /> Southern Hemisphere
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    There is no bright "South Star." You must align using the faint constellation <strong>Octans</strong> and the celestial pole position relative to the Southern Cross.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold text-white mb-4">Calibration Steps</h3>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-cyan-500 text-slate-800 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        1
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700 bg-slate-800 shadow">
                                        <div className="font-bold text-slate-200 mb-1">Level the Tripod</div>
                                        <div className="text-slate-400 text-xs">Ensure the base is perfectly level using the bubble level. This separates Azimuth (Left/Right) from Altitude (Up/Down) adjustments.</div>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-cyan-500 text-slate-800 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        2
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700 bg-slate-800 shadow">
                                        <div className="font-bold text-slate-200 mb-1">Set Rough Altitude</div>
                                        <div className="text-slate-400 text-xs">Adjust the wedge altitude to match your local latitude (e.g., 35° if you are at 35°N).</div>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-cyan-500 text-slate-800 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        3
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700 bg-slate-800 shadow">
                                        <div className="font-bold text-slate-200 mb-1">Polar Alignment</div>
                                        <div className="text-slate-400 text-xs">Look through the polar scope. Use the Azimuth/Altitude bolts to place Polaris in the specific position indicated by your polar clock app.</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StarMap;
