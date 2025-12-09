import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import StarField from './StarField';
import backgroundSvg from '../background.svg';
import { Mail, User, ChevronLeft } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">
            {/* Background Image */}
            <img
                src={backgroundSvg}
                alt="Astrophotography Background"
                className="fixed top-0 left-0 w-full h-full object-cover -z-20"
            />

            {/* StarField Overlay */}
            <StarField />

            <Navigation />

            <main className="relative z-10 flex-grow flex items-center justify-center py-24 px-6">
                <div className="max-w-4xl mx-auto w-full">
                    <a href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Return to Database</span>
                    </a>

                    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl bg-slate-950/60 backdrop-blur-xl">

                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-20 h-20 bg-cyan-950/50 rounded-full flex items-center justify-center border border-cyan-500/30 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                                <User className="w-10 h-10 text-cyan-400" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-white mb-4">
                                About <span className="text-cyan-400">Me</span>
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full opacity-60"></div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-slate-300 leading-relaxed text-lg mb-8">
                                Hi! My name is <strong>Trex</strong> and I love Astrophotography. With help from my dad, who is a Lead AI specialist at Google, I have created this website.
                            </p>

                            <p className="text-slate-300 leading-relaxed text-lg mb-8">
                                I have found it hard to find all info about astrophotography in a simple, smooth way from any website. My goal with this website is help curent Astrophotgraphers and New Astrophotographers learn, reference and excute all of their Astrophotography needs.
                            </p>

                            <p className="text-slate-300 leading-relaxed text-lg mb-10">
                                If you have any questions or would like your photos to be put on display, at no charge, you can email me at the address below. Feedback on the website is also welcomed! Thanks so much for checking this site out and I hope you comeback whenever you need it!
                            </p>

                            <div className="flex flex-col items-center justify-center py-8 border-t border-slate-800/50">
                                <h3 className="font-['Space_Grotesk'] text-xl text-white mb-2 font-bold">Trex Davis</h3>
                                <a
                                    href="mailto:trexadavis@gmail.com"
                                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group bg-cyan-950/30 px-6 py-3 rounded-full border border-cyan-500/20 hover:border-cyan-500/50"
                                >
                                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium text-lg">trexadavis@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
