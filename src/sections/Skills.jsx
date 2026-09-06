import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Layers, 
  Cloud, 
  Palette, 
  Wrench, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ashlinProfile } from '../data/ashlinProfile';
import { audioEngine } from '../utils/audioEngine';

export default function Skills() {
  const { skills, skillRelations } = ashlinProfile;
  const [selectedSkill, setSelectedSkill] = useState("Python");

  const categories = [
    { key: 'frontend', data: skills.frontend, icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { key: 'backend', data: skills.backend, icon: <Server className="w-4 h-4 text-purple-400" /> },
    { key: 'fullstack', data: skills.fullstack, icon: <Layers className="w-4 h-4 text-emerald-400" /> },
    { key: 'cloud', data: skills.cloud, icon: <Cloud className="w-4 h-4 text-sky-400" /> },
    { key: 'uiux', data: skills.uiux, icon: <Palette className="w-4 h-4 text-rose-400" /> },
    { key: 'tools', data: skills.tools, icon: <Wrench className="w-4 h-4 text-amber-400" /> }
  ];

  const currentRelations = skillRelations[selectedSkill] || [
    { type: "Core Competency", label: `Core engineering capability in Ashlin's portfolio.` }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="w-full max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
              PHASE 05
            </span>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
              SYSTEM CAPABILITIES // SKILLS MATRIX
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE NODE NETWORK</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Category Matrix (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="hud-card rounded-xl p-5 border border-zinc-800/80 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center gap-2 font-orbitron text-xs font-bold text-white mb-3 pb-2 border-b border-zinc-800">
                  {cat.icon}
                  <span>{cat.data.title.toUpperCase()}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.data.items.map((skillItem) => {
                    const isSelected = selectedSkill === skillItem;
                    return (
                      <button
                        key={skillItem}
                        onClick={() => {
                          audioEngine.playTactileBlip(720, 0.02);
                          setSelectedSkill(skillItem);
                        }}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                          isSelected
                            ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-cyan-sm font-bold scale-105'
                            : 'bg-black/50 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 hover:text-white'
                        }`}
                      >
                        {skillItem}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Selected Node Inspection Panel (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="hud-card rounded-xl p-6 border border-cyan-400/40 bg-[#07080f]/90 h-full flex flex-col justify-between">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                      NODE TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                    PORTFOLIO PROFILE
                  </span>
                </div>

                <div className="font-orbitron font-extrabold text-2xl text-white mb-2">
                  {selectedSkill}
                </div>

                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
                  DEPLOYED IN MISSIONS & SYSTEMS:
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {currentRelations.map((rel, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 rounded-lg bg-black/50 border border-cyan-500/20 space-y-1"
                    >
                      <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                        [{rel.type}]
                      </div>
                      <div className="text-zinc-200 text-xs font-inter leading-snug">
                        {rel.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tap any technology to inspect its connections.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
