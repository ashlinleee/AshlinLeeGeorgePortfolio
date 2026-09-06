import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  Bot, 
  Menu, 
  X, 
  Radio, 
  Terminal,
  Activity
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ 
  activeSection, 
  onNavigate, 
  onToggleVoice, 
  isVoiceActive,
  onToggleChat,
  isChatOpen 
}) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = audioEngine.toggleSound();
    setIsAudioActive(active);
  };

  const navItems = [
    { id: 'identity', label: '01 ABOUT', sectionIndex: 1 },
    { id: 'experience', label: '02 INTERNSHIPS', sectionIndex: 2 },
    { id: 'impact', label: '03 IMPACT', sectionIndex: 3 },
    { id: 'projects', label: '04 PROJECTS', sectionIndex: 4 },
    { id: 'skills', label: '05 SKILLS', sectionIndex: 5 },
    { id: 'education', label: '06 ACADEMICS', sectionIndex: 6 },
    { id: 'contact', label: '07 CONNECT', sectionIndex: 9 },
  ];

  const handleNavClick = (sectionIndex) => {
    audioEngine.playTactileBlip(750, 0.04);
    if (onNavigate) onNavigate(sectionIndex);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#030304]/80 backdrop-blur-md border-b border-cyan-500/20 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* System Identity Brand */}
          <div 
            onClick={() => handleNavClick(0)}
            className="cursor-pointer group flex items-center gap-3 select-none"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded border border-cyan-400/40 bg-cyan-950/20 group-hover:border-cyan-300 group-hover:shadow-cyan-glow transition-all">
              <span className="font-orbitron font-bold text-xs text-cyan-400">ALG</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-sm tracking-widest text-white group-hover:text-cyan-300 transition-colors">
                ASHLIN LEE GEORGE
              </span>
              <span className="text-[10px] font-mono tracking-wider text-cyan-400/70">
                ML / FULL STACK OS v2.4
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.sectionIndex)}
                  onMouseEnter={() => audioEngine.playTactileBlip(520, 0.02)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-200 relative ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-cyan-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Triggers: Audio, Voice Mode, AI Chatbot */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Ambience Toggle */}
            <button
              onClick={toggleSound}
              title={isAudioActive ? "Mute Ambient Cyber Sound" : "Activate Ambient Cyber Sound"}
              className={`p-2 rounded border transition-all ${
                isAudioActive
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-sm'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Voice Mode Trigger (Talk to Portfolio) */}
            <button
              onClick={onToggleVoice}
              title="Talk to Ashlin's Portfolio"
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded border text-xs font-mono transition-all cursor-pointer ${
                isVoiceActive
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-cyan-glow animate-pulse'
                  : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-300 shadow-cyan-sm'
              }`}
            >
              <Mic className={`w-3.5 h-3.5 ${isVoiceActive ? 'text-red-400 animate-bounce' : 'text-cyan-400'}`} />
              <span className="tracking-wider font-bold">VOICE</span>
            </button>

            {/* AI Chatbot Header Trigger */}
            <button
              onClick={onToggleChat}
              title="Open Ashlin AI Assistant"
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-all ${
                isChatOpen
                  ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-violet-glow'
                  : 'bg-zinc-900/60 border-purple-500/30 text-purple-300 hover:bg-purple-950/40 hover:border-purple-400'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="tracking-widest hidden xs:inline">ASHLIN AI</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-[#030304]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 border-b border-cyan-500/30">
          <div className="space-y-3">
            <div className="text-[11px] font-mono text-cyan-400/60 tracking-widest uppercase border-b border-cyan-500/20 pb-2">
              SYSTEM SECTORS
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.sectionIndex)}
                className="w-full text-left py-3 px-4 rounded border border-zinc-800/80 bg-zinc-900/40 text-sm font-mono tracking-wider text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-cyan-500 text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-zinc-800">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { onToggleVoice(); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 py-2.5 rounded border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-mono"
              >
                <Mic className="w-4 h-4" />
                VOICE MODE
              </button>
              <button
                onClick={() => { onToggleChat(); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 py-2.5 rounded border border-purple-500/40 bg-purple-950/30 text-purple-300 text-xs font-mono"
              >
                <Bot className="w-4 h-4" />
                ASHLIN AI
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
