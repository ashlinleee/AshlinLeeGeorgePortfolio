import React from "react";
import { Sparkles, Radio, Palette, Compass, Sparkle, Code } from "lucide-react";
import { ashlinProfile } from "../data/ashlinProfile";

export default function HumanModule() {
  const { languages, interests } = ashlinProfile;

  const getInterestIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Palette className="w-5 h-5 text-rose-400" />;
      case 1:
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Sparkle className="w-5 h-5 text-amber-400" />;
      case 3:
        return <Code className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="w-full max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
            PHASE 06
          </span>
          <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
            LANGUAGES & CREATIVE PURSUITS
          </h2>
        </div>

        {/* Languages as Communication Channels */}
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>COMMUNICATION CHANNELS // MULTILINGUAL PROFICIENCY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {languages.map((lang, lIdx) => (
              <div
                key={lIdx}
                className="hud-card rounded-xl p-5 border border-cyan-500/20 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-2">
                  <span>{lang.channel}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div className="font-space font-bold text-lg text-white">
                  {lang.name}
                </div>
                <div className="font-mono text-xs text-cyan-300 mt-1.5 font-semibold">
                  {lang.level}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outside the System - Human Pursuits */}
        <div>
          <div className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>OUTSIDE THE SYSTEM // CREATIVE PURSUITS & HOBBIES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {interests.map((interest, iIdx) => (
              <div
                key={iIdx}
                className="rounded-xl p-5 border border-zinc-800 bg-[#0d090d]/80 hover:border-rose-500/40 backdrop-blur-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 w-fit mb-3">
                    {getInterestIcon(iIdx)}
                  </div>
                  <h4 className="font-space font-bold text-sm text-white mb-1">
                    {interest.name}
                  </h4>
                  <div className="text-[10px] font-mono text-rose-300/80 mb-2">
                    {interest.category}
                  </div>
                  <p className="text-xs text-zinc-400 font-inter leading-relaxed">
                    {interest.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
