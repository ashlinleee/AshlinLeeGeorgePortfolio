import React, { useState } from 'react';
import { 
  Eye, 
  Compass, 
  CalendarCheck, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Activity, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ashlinProfile } from '../data/ashlinProfile';
import { audioEngine } from '../utils/audioEngine';

function ProjectSignals({ signals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Project impact signals">
      {signals.map((signal) => (
        <div key={signal.label} className="rounded-lg border border-cyan-500/20 bg-black/35 p-3">
          <div className="flex items-baseline justify-between gap-3 font-mono">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">{signal.label}</span>
            <span className="font-orbitron text-sm font-bold text-cyan-300">{signal.display}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900" aria-hidden="true">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-400 transition-all duration-700"
              style={{ width: `${signal.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const { projects } = ashlinProfile;
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const activeProject = projects[activeProjectIdx];

  const getSystemIcon = (index) => {
    switch(index) {
      case 0: return <Eye className="w-5 h-5 text-cyan-400" />;
      case 1: return <Compass className="w-5 h-5 text-purple-400" />;
      case 2: return <CalendarCheck className="w-5 h-5 text-emerald-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="w-full max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
              PHASE 04
            </span>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
              CREATED SYSTEMS // ARCHITECTURES
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            ENGINEERED PLATFORMS [03/03]
          </div>
        </div>

        {/* Project Selector Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {projects.map((proj, idx) => {
            const isSelected = activeProjectIdx === idx;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  audioEngine.playTactileBlip(680 + idx * 80, 0.03);
                  setActiveProjectIdx(idx);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-400 shadow-cyan-sm'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-cyan-500/30 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {proj.code}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-cyan-500/20 text-zinc-400">
                    {proj.category.split(' ')[0]}
                  </span>
                </div>
                <div className="font-space font-bold text-sm text-white truncate">
                  {proj.title}
                </div>
                <div className="text-[11px] text-zinc-400 truncate mt-1 font-mono">
                  {proj.technologies.join(' • ')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Project HUD Console */}
        <div className="hud-card rounded-2xl p-6 sm:p-8 border border-cyan-400/30 relative">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-cyan-500/20 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                {getSystemIcon(activeProjectIdx)}
              </div>
              <div>
                <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                  {activeProject.code} // {activeProject.category}
                </span>
                <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                  {activeProject.title}
                </h3>
              </div>
            </div>

            {activeProject.link && (
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playTactileBlip(880, 0.04)}
                className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold hover:bg-cyan-500/30 hover:shadow-cyan-sm transition-all flex items-center gap-2"
              >
                <span>VISIT SYSTEM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Body Content */}
          <div className="space-y-6">
            
            {/* Brief overview */}
            <p className="max-w-4xl text-zinc-200 text-sm sm:text-base leading-relaxed font-inter">
              {activeProject.description}
            </p>

            {/* Compact visual summary of the project's reported impact */}
            <ProjectSignals signals={activeProject.signals} />

            {/* AI Vision Pipeline Visualization (For Brain Tumour Project) */}
            {activeProject.pipeline && (
              <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>DEEP LEARNING NEURAL VISION PIPELINE:</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                  {activeProject.pipeline.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/25 flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        {step.step}
                      </span>
                      <div className="font-space font-bold text-xs text-white my-1">
                        {step.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 leading-tight">
                        {step.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Chips */}
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                STACK DEPLOYED:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded bg-zinc-900 border border-cyan-500/20 text-cyan-200 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
