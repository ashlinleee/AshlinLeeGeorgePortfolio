import React, { useState, useEffect, useRef } from 'react';
import ScrollVideo from './components/ScrollVideo';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import VoiceMode from './components/VoiceMode';
import Chatbot from './components/Chatbot';

import Hero from './sections/Hero';
import Identity from './sections/Identity';
import Experience from './sections/Experience';
import SocialImpact from './sections/SocialImpact';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import HumanModule from './sections/HumanModule';
import Contact from './sections/Contact';

import { useScrollProgress } from './hooks/useScrollProgress';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const { scrollProgress, activeSection } = useScrollProgress();

  const [loadingProgress, setLoadingProgress] = useState(15);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Section references for smooth scrolling navigation
  const sectionRefs = [
    useRef(null), // 00 Hero
    useRef(null), // 01 Identity
    useRef(null), // 02 Experience
    useRef(null), // 03 Social Impact
    useRef(null), // 04 Projects
    useRef(null), // 05 Skills
    useRef(null), // 06 Education
    useRef(null), // 07 Human Module
    useRef(null), // 09 Contact
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
    setHasEntered(true);
    audioEngine.playChirp('success');
    navigateToSection(1);
  };

  // Opening a fixed overlay must never alter the reader's place in the story.
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
        onToggleVoice={() => setIsVoiceActive(!isVoiceActive)}
        isVoiceActive={isVoiceActive}
        onToggleChat={toggleChatAtCurrentPosition}
        isChatOpen={isChatOpen}
      />

      {/* Voice Mode HUD Interface */}
      <VoiceMode
        isOpen={isVoiceActive}
        onClose={() => setIsVoiceActive(false)}
        onNavigate={navigateToSection}
      />

      {/* Floating ASHLIN AI Assistant Chatbot */}
      <Chatbot
        isOpen={isChatOpen}
        onToggle={toggleChatAtCurrentPosition}
        onNavigate={navigateToSection}
      />

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

        {/* Phase 02: Mission Logs (Experience) */}
        <div ref={sectionRefs[2]} id="section-2">
          <Experience />
        </div>

        {/* Phase 03: Human Connection Protocol (Social Impact) */}
        <div ref={sectionRefs[3]} id="section-3">
          <SocialImpact />
        </div>

        {/* Phase 04: Created Systems (Projects) */}
        <div ref={sectionRefs[4]} id="section-4">
          <Projects />
        </div>

        {/* Phase 05: System Capabilities (Skills Matrix) */}
        <div ref={sectionRefs[5]} id="section-5">
          <Skills />
        </div>

        {/* Phase 06: Academic Core & System Certifications */}
        <div ref={sectionRefs[6]} id="section-6">
          <Education />
        </div>

        {/* Phase 07: Human Intelligence, Languages & Pursuits */}
        <div ref={sectionRefs[7]} id="section-7">
          <HumanModule />
        </div>

        {/* Phase 09: Establish Connection & System Shutdown */}
        <div ref={sectionRefs[9]} id="section-9">
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
