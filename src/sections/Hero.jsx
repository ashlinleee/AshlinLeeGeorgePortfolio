import React, { useState, useEffect } from "react";
import {
  Terminal,
  Shield,
  ArrowDown,
  ChevronRight,
  Activity,
  Cpu,
  Download,
} from "lucide-react";

export default function Hero({ onEnterSystem }) {
  const [bootStep, setBootStep] = useState(0);
  const [typedName, setTypedName] = useState("");
  const fullName = "ASHLIN LEE GEORGE";

  // Boot sequence
  useEffect(() => {
    const t1 = setTimeout(() => setBootStep(1), 400); // scan initiated
    const t2 = setTimeout(() => setBootStep(2), 1100); // neural core active
    const t3 = setTimeout(() => setBootStep(3), 1800); // identity online

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Character-by-character name reveal
  useEffect(() => {
    if (bootStep < 3) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedName(fullName.slice(0, index + 1));
      index++;
      if (index >= fullName.length) {
        clearInterval(interval);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [bootStep]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 z-10 select-none">
      {/* Top Diagnostics Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 pt-16 sm:pt-20">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-cyan-300">
            SYSTEM STATUS: ONLINE
          </span>
          <span className="hidden sm:inline text-zinc-600 font-mono">|</span>
          <span className="hidden sm:inline font-mono text-xs text-zinc-400">
            NEURAL CORE: ACTIVE
          </span>
        </div>

        {/* Decorative Telemetry (Clearly Demarcated) */}
        <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400">
          <div className="hidden md:flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>PROCESSING: 98%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>IDENTITY: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Center Cinematic Typography & Robot Anchor Frame */}
      <div className="my-auto py-12 max-w-4xl">
        <div className="space-y-4">
          {/* Character-by-character Title */}
          <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white glow-cyan">
            {typedName}
            {typedName.length < fullName.length && (
              <span className="animate-pulse text-cyan-400">_</span>
            )}
          </h1>

          {/* Subtitle / Discipline */}
          <div className="font-space font-semibold text-lg sm:text-2xl text-cyan-200 tracking-wide">
            AI/ML ENGINEER | FULL STACK DEVELOPER
          </div>

          {/* Concise Bio Teaser */}
          <p className="max-w-2xl text-zinc-300 font-inter text-sm sm:text-base leading-relaxed pt-3 backdrop-blur-xs">
            Building intelligent systems and turning ideas into impactful
            products with Machine Learning, Deep Learning, and Full-Stack
            Engineering.
          </p>
        </div>

        {/* Enter System + Download Resume */}
        <div className="pt-8 flex flex-wrap items-center gap-4">
          {/* Enter System */}
          <button
            onClick={() => onEnterSystem?.()}
            className="group relative px-6 py-3.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold tracking-widest hover:bg-cyan-500/30 hover:shadow-cyan-glow transition-all flex items-center gap-3"
          >
            <span>[ ENTER SYSTEM ]</span>
            <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Download Resume */}
          <a
            href="/resume/Ashlin%20CV.pdf"
            download="Ashlin_CV.pdf"
            className="group relative px-6 py-3.5 rounded bg-white/5 border border-white/20 text-white/80 font-mono text-xs font-bold tracking-widest hover:bg-white/10 hover:border-cyan-400/60 hover:text-cyan-200 transition-all flex items-center gap-3"
          >
            <span>[ DOWNLOAD RESUME ]</span>

            <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom HUD Bar */}
      <div className="flex items-center justify-between border-t border-cyan-500/20 pt-4 font-mono text-[11px] text-zinc-500">
        <div>COORDINATES: 19.0330° N, 73.0297° E // MUMBAI</div>
        <div className="flex items-center gap-2">
          <span>TIMELINE 00/09</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
