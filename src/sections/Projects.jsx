import React, { useState } from "react";
import {
  Eye,
  Compass,
  CalendarCheck,
  ExternalLink,
  Cpu,
  Activity,
} from "lucide-react";
import { ashlinProfile } from "../data/ashlinProfile";

function ProjectSignals({ signals }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      aria-label="Project impact signals"
    >
      {signals.map((signal) => (
        <div
          key={signal.label}
          className="rounded-lg border border-cyan-500/20 bg-black/35 p-3"
        >
          <div className="flex items-baseline justify-between gap-3 font-mono">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">
              {signal.label}
            </span>
            <span className="font-orbitron text-sm font-bold text-cyan-300">
              {signal.display}
            </span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900"
            aria-hidden="true"
          >
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
    switch (index) {
      case 0:
        return <Eye className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Compass className="w-5 h-5 text-purple-400" />;
      case 2:
        return <CalendarCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="relative flex items-center justify-center px-6 py-12 sm:px-12 sm:py-16 z-10">
      <div className="w-full max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
              PHASE 02
            </span>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
              PROJECTS
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            ENGINEERED PLATFORMS [03/03]
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,1fr)] gap-5 lg:gap-8 items-stretch">
          {/* Persistent project navigation - equal height to right card */}
          <aside className="hud-card rounded-2xl p-4 sm:p-6 border border-cyan-500/25 relative min-w-0 h-full flex flex-col justify-between">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-400 font-semibold">
                  SELECT A PROJECT
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  [0{projects.length} PROJECTS]
                </span>
              </div>

              <div className="mt-4 flex-1 flex flex-col justify-between gap-3">
                {projects.map((proj, idx) => {
                  const isSelected = activeProjectIdx === idx;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProjectIdx(idx)}
                      aria-pressed={isSelected}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex-1 flex flex-col justify-between ${
                        isSelected
                          ? "bg-cyan-950/60 border-cyan-400 shadow-cyan-sm ring-1 ring-cyan-400/30"
                          : "bg-black/30 border-zinc-800/80 hover:border-cyan-500/40 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] font-bold tracking-wider ${isSelected ? "text-cyan-300" : "text-zinc-500"}`}
                        >
                          {proj.code}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        )}
                      </div>
                      <span
                        className={`block my-1.5 font-space font-bold text-sm sm:text-base leading-snug ${isSelected ? "text-white" : "text-zinc-300"}`}
                      >
                        {proj.title}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {proj.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="flex items-center gap-1.5 text-cyan-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                SYSTEM ACTIVE
              </span>
              <span>INDEX: 0{activeProjectIdx + 1}</span>
            </div>
          </aside>

          {/* Selected project content */}
          <div className="hud-card rounded-2xl p-6 sm:p-8 border border-cyan-400/30 relative min-w-0 h-full flex flex-col justify-between">
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
                    {activeProject.category}
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
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold hover:bg-cyan-500/30 hover:shadow-cyan-sm transition-all flex items-center gap-2"
                >
                  <span>VISIT WORK</span>
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

              {/* Project development pipeline */}
              {activeProject.pipeline && (
                <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-3">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>DEVELOPMENT PIPELINE:</span>
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
                  TOOLKIT & TECHNOLOGIES USED:
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
      </div>
    </section>
  );
}
