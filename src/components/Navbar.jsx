import React, { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const RESUME_PATH = "/resume/Ashlin%20CV.pdf";

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "identity", label: "01 ABOUT", sectionIndex: 1 },
    { id: "projects", label: "02 PROJECTS", sectionIndex: 2 },
    { id: "experience", label: "03 INTERNSHIPS", sectionIndex: 3 },
    { id: "skills", label: "04 SKILLS", sectionIndex: 4 },
    { id: "education", label: "05 ACADEMICS", sectionIndex: 5 },
    { id: "contact", label: "06 CONTACT", sectionIndex: 6 },
  ];

  const handleNavClick = (sectionIndex) => {
    onNavigate?.(sectionIndex);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030304]/80 backdrop-blur-md border-b border-cyan-500/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => handleNavClick(0)}
            className="cursor-pointer group flex items-center gap-3 text-left select-none"
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded border border-cyan-400/40 bg-cyan-950/20 group-hover:border-cyan-300 group-hover:shadow-cyan-glow transition-all font-orbitron font-bold text-xs text-cyan-400">
              ALG
            </span>
            <span className="flex flex-col">
              <span className="font-orbitron font-bold text-sm tracking-widest text-white group-hover:text-cyan-300 transition-colors">
                ASHLIN LEE GEORGE
              </span>
              <span className="text-[10px] font-mono tracking-wider text-cyan-400/70">
                AI/ML | FULL STACK
              </span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.sectionIndex)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-200 relative ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-cyan-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
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

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={RESUME_PATH}
              download="Ashlin_CV.pdf"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-300 text-xs font-mono font-bold tracking-wider transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden p-2 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

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
          <a
            href={RESUME_PATH}
            download="Ashlin_CV.pdf"
            className="flex items-center justify-center gap-2 py-3 rounded border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-mono font-bold"
          >
            <Download className="w-4 h-4" /> DOWNLOAD RESUME
          </a>
        </div>
      )}
    </>
  );
}
