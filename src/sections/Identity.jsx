import React from 'react';
import { BrainCircuit, Code2, Fingerprint, Network, Sparkles } from 'lucide-react';
import { ashlinProfile } from '../data/ashlinProfile';

export default function Identity() {
  const { identity } = ashlinProfile;
  const capabilityIcons = [
    <BrainCircuit className="w-5 h-5 text-purple-300" />,
    <Code2 className="w-5 h-5 text-cyan-300" />,
    <Network className="w-5 h-5 text-emerald-300" />
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="w-full max-w-5xl">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
            PHASE 01
          </span>
          <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
            IDENTITY PROFILE
          </h2>
        </div>

        {/* Futuristic Dossier Card */}
        <div className="hud-card rounded-2xl p-6 sm:p-10 border border-cyan-400/30">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left profile mark */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-black/40 border border-cyan-500/20 text-center relative overflow-hidden">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-dashed border-cyan-400/60 p-2 flex items-center justify-center relative animate-pulse">
                <div className="w-full h-full rounded-full bg-cyan-950/40 border border-cyan-400 flex items-center justify-center">
                  <Fingerprint className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-300" />
                </div>
              </div>

              <div className="mt-4 font-orbitron text-sm font-bold text-white tracking-widest">
                {identity.name}
              </div>
              <div className="font-mono text-[11px] text-cyan-400/80 mt-1">
                AI/ML • FULL STACK • SOFTWARE SYSTEMS
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-[10px] font-mono">
                <Sparkles className="w-3 h-3" />
                <span>BUILDING USEFUL TECHNOLOGY</span>
              </div>
            </div>

            {/* Right value proposition and capabilities */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-5 rounded-xl bg-black/40 border border-cyan-500/20 relative">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>THE VALUE SHE BRINGS</span>
                </div>
                <p className="font-space text-xl sm:text-2xl font-semibold leading-snug text-white">
                  {identity.valueProposition}
                </p>
              </div>

              <div>
                <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">WHAT SHE CAN BUILD</div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {identity.capabilities.map((capability, index) => (
                    <div key={capability.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-cyan-500/40">
                      <div className="mb-3 w-fit rounded-lg border border-cyan-500/20 bg-black/40 p-2">
                        {capabilityIcons[index]}
                      </div>
                      <h3 className="font-space text-sm font-bold text-white">{capability.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{capability.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
