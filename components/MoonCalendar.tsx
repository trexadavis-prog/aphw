import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// Accurate Moon Phase Calculation
// Returns phase 0-1 (0=New, 0.5=Full, 1=New)
const getMoonPhase = (date: Date) => {
    const synodicMonth = 29.53058867;
    // Reference New Moon: January 18, 2026 at 23:02 UTC (approx)
    // Using UTC to avoid timezone oddities
    const knownNewMoon = new Date(Date.UTC(2026, 0, 19, 6, 2, 0));

    const diffTime = date.getTime() - knownNewMoon.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const totalCycles = diffDays / synodicMonth;

    // Normalize to 0-1
    let currentCycle = totalCycles % 1;
    if (currentCycle < 0) currentCycle += 1;

    return currentCycle;
};

// SVG Moon Icon for realistic phase rendering
const MoonIcon: React.FC<{ phase: number; size?: number }> = ({ phase, size = 32 }) => {
    // Logic to generate SVG path for the lit portion of the moon
    // Assuming Northern Hemisphere view (Lit from Right for Waxing)

    // Determine phase properties
    const isWaxing = phase <= 0.5;
    // Tighter tolerance for New/Full to avoid tiny slivers when it should look "clean"
    const isNew = phase < 0.02 || phase > 0.98;
    const isFull = Math.abs(phase - 0.5) < 0.02;

    let pathD = "";

    if (isNew) {
        // Just dark circle (handled by container bg)
        pathD = "";
    } else if (isFull) {
        // Full circle
        pathD = `M 50 5 A 45 45 0 1 1 50 95 A 45 45 0 1 1 50 5`;
    } else {
        const r = 45;
        // Direction of light: Waxing (0-0.5): Right side lit. Waning (0.5-1): Left side lit.
        const mag = Math.cos(2 * Math.PI * phase); // -1 to 1. 0 at Quarters.
        const rx = r * Math.abs(mag);

        if (isWaxing) {
            // Right side is stable Outer: Top(50,5) -> Right -> Bottom(50,95)
            const outer = `M 50 5 A 45 45 0 0 1 50 95`;
            // Inner: Bottom -> Top. Curve depends on Gibbous vs Crescent
            const direction = phase < 0.25 ? 0 : 1; // Sweep: 0 for Crescent (Right), 1 for Gibbous (Left)
            const inner = `A ${rx} 45 0 0 ${direction} 50 5`;
            pathD = `${outer} ${inner}`;
        } else {
            // Waning: Left side is stable Outer: Bottom(50,95) -> Left -> Top(50,5)
            const outer = `M 50 95 A 45 45 0 0 1 50 5`;
            // Inner: Top -> Bottom.
            const direction = phase < 0.75 ? 1 : 0;
            pathD = `${outer} A ${rx} 45 0 0 ${direction} 50 95`;
        }
    }

    // Tooltip text
    let phaseName = "";
    if (isNew) phaseName = "New Moon";
    else if (phase < 0.23) phaseName = "Waxing Crescent";
    else if (phase < 0.27) phaseName = "First Quarter";
    else if (phase < 0.48) phaseName = "Waxing Gibbous";
    else if (isFull) phaseName = "Full Moon";
    else if (phase < 0.73) phaseName = "Waning Gibbous";
    else if (phase < 0.77) phaseName = "Last Quarter";
    else phaseName = "Waning Crescent";

    return (
        <div
            style={{ width: size, height: size }}
            className="relative rounded-full bg-slate-950 border border-slate-700 shadow-inner overflow-hidden flex-shrink-0"
            title={`${phaseName} (${(phase * 100).toFixed(0)}%)`}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
                {pathD && <path d={pathD} fill="currentColor" stroke="none" />}
            </svg>

            {/* Glossy overlay */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
    );
};


const MoonCalendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(0); // 0 = Jan 2026

    const year = 2026;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const handlePrev = () => {
        if (currentMonth > 0) setCurrentMonth(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentMonth < 11) setCurrentMonth(prev => prev + 1);
    };

    const renderCalendarDays = () => {
        const totalDays = daysInMonth(currentMonth, year);
        const startDay = firstDayOfMonth(currentMonth, year);
        const days = [];

        // Empty slots for start day
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-slate-900/30 border border-slate-800/50 rounded-lg" />);
        }

        for (let d = 1; d <= totalDays; d++) {
            // Use UTC for consistent phase calculation across timezones for a "Global" calendar
            const date = new Date(Date.UTC(year, currentMonth, d, 12, 0, 0));
            const phase = getMoonPhase(date);
            const isFullMoon = Math.abs(phase - 0.5) < 0.02;
            const isNewMoon = phase < 0.02 || phase > 0.98;

            days.push(
                <div
                    key={d}
                    className={`h-24 md:h-32 p-2 border rounded-lg relative transition-all group hover:z-10 hover:scale-105 hover:bg-slate-800 ${isFullMoon ? 'border-yellow-200/50 bg-yellow-900/10 shadow-[0_0_15px_rgba(253,224,71,0.1)]' :
                        isNewMoon ? 'border-indigo-900/50 bg-slate-950 opacity-80' : 'border-slate-800/50 bg-slate-900/50'
                        }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-sm font-mono ${isFullMoon ? 'text-yellow-200 font-bold' : 'text-slate-400'}`}>{d}</span>
                    </div>

                    {/* Phase visualization - Centered */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <MoonIcon phase={phase} size={48} />
                    </div>

                    {isFullMoon && <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-yellow-200 uppercase tracking-wider font-bold">Full Moon</div>}
                    {isNewMoon && <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-slate-500 uppercase tracking-wider">New Moon</div>}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
                    <div className="flex items-center gap-3">
                        <Moon className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] tracking-wider text-white">
                            MOON CYCLE <span className="text-cyan-400">2026</span>
                        </h1>
                    </div>
                    <a href="/" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> Return to Database
                    </a>
                </header>

                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden p-4 md:p-8">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentMonth === 0}
                            className="p-3 bg-slate-800 rounded-full hover:bg-cyan-900 hover:text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft />
                        </button>

                        <h2 className="text-xl md:text-3xl font-bold w-full text-center">{monthNames[currentMonth]} {year}</h2>

                        <button
                            onClick={handleNext}
                            disabled={currentMonth === 11}
                            className="p-3 bg-slate-800 rounded-full hover:bg-cyan-900 hover:text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4 text-center text-slate-500 text-xs md:text-sm uppercase tracking-widest font-semibold">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 md:gap-3">
                        {renderCalendarDays()}
                    </div>
                </div>

                <footer className="mt-12 text-center text-slate-600 text-sm">
                    Calculated based on synodic month (29.53d) from 2026 reference epoch.
                    <br />
                    Visuals represent Northern Hemisphere orientation.
                </footer>
            </div>
        </div>
    );
};

export default MoonCalendar;
