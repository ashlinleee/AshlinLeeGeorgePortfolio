import React, { useState, useEffect, useRef } from 'react';
import ScrollVideo from './components/ScrollVideo';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Chatbot from './components/Chatbot';

import Hero from './sections/Hero';
import Identity from './sections/Identity';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';

import { useScrollProgress } from './hooks/useScrollProgress';

export default function App() {
  const { scrollProgress, activeSection } = useScrollProgress();

  const [loadingProgress, setLoadingProgress] = useState(15);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Section references for smooth scrolling navigation (7 sequential phases)
  const sectionRefs = [
    useRef(null), // 00 Hero
    useRef(null), // 01 Identity Profile
    useRef(null), // 02 Projects
    useRef(null), // 03 Experience / Internships
    useRef(null), // 04 Skills, Certifications & Pursuits
    useRef(null), // 05 Academic Core
    useRef(null), // 06 Connect / Contact
  ];

  // Navigate to any section by index
  const navigateToSection = (index) => {
    const targetRef = sectionRefs[index];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoLoadProgress = (pct) => {
    setLoadingProgress(Math.max(15, pct));
  };

  const handleVideoReady = () => {
    setTimeout(() => {
      setIsSystemReady(true);
    }, 400);
  };

  // Fallback timer to ensure loading screen never hangs
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSystemReady(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterSystem = () => {
    navigateToSection(1);
  };

  const toggleChatAtCurrentPosition = () => {
    const currentScroll = window.scrollY;
    setIsChatOpen((open) => !open);
    requestAnimationFrame(() => window.scrollTo({ top: currentScroll, left: 0, behavior: 'auto' }));
  };

  return (
    <div className="relative bg-[#030304] text-white min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Desktop Custom Magnetic Reticle Cursor */}
      <CustomCursor />

      {/* 
        CENTRAL SCROLL-DRIVEN CYBORG VIDEO ENGINE
        Guarantees 100% video frame visibility without cropping on all devices
      */}
      <ScrollVideo 
        scrollProgress={scrollProgress}
        onLoadProgress={handleVideoLoadProgress}
        onReady={handleVideoReady}
      />

      {/* Cybernetic HUD Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      <Chatbot isOpen={isChatOpen} onToggle={toggleChatAtCurrentPosition} />

      {/* 
        CONTINUOUS CINEMATIC STORYLINE SECTIONS
        Layered cleanly over the pinned cyborg video
      */}
      <main className="relative z-10 w-full overflow-hidden">
        
        {/* Phase 00: Hero / System Initialization */}
        <div ref={sectionRefs[0]} id="section-0">
          <Hero onEnterSystem={handleEnterSystem} />
        </div>

        {/* Phase 01: Identity Profile */}
        <div ref={sectionRefs[1]} id="section-1">
          <Identity />
        </div>

        {/* Phase 02: Created Systems (Projects) */}
        <div ref={sectionRefs[2]} id="section-2">
          <Projects />
        </div>

        {/* Phase 03: Internship Timeline */}
        <div ref={sectionRefs[3]} id="section-3">
          <Experience />
        </div>

        {/* Phase 04: System Capabilities, Certifications & Creative Pursuits */}
        <div ref={sectionRefs[4]} id="section-4">
          <Skills />
        </div>

        {/* Phase 05: Academic Core */}
        <div ref={sectionRefs[5]} id="section-5">
          <Education />
        </div>

        {/* Phase 06: Establish Connection / Contact */}
        <div ref={sectionRefs[6]} id="section-6">
          <Contact />
        </div>

      </main>

      {/* System Initialization Loading Overlay */}
      {!isSystemReady && (
        <div className="fixed inset-0 z-50 bg-[#030304] flex flex-col items-center justify-center p-6 select-none">
          <div className="w-full max-w-md space-y-6 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />

            <div className="space-y-2">
              <div className="font-orbitron font-bold text-lg tracking-widest text-cyan-300 glow-cyan">
                INITIALIZING PORTFOLIO SYSTEM...
              </div>
              <div className="font-mono text-xs text-zinc-400">
                ASHLIN LEE GEORGE // CYBORG INTERFACE v2.4
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/20 font-mono text-xs text-left space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>VIDEO CORE:</span>
                <span className="text-cyan-400 font-bold">{loadingProgress}%</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>INTERFACE MATRIX:</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>PORTFOLIO KNOWLEDGE BASE:</span>
                <span className="text-emerald-400">AUTHENTICATED</span>
              </div>
            </div>

            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-cyan-500/30">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
