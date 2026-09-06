import React, { useState } from 'react';
import { Plane, Brain, Database, Calendar, MapPin, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { ashlinProfile } from '../data/ashlinProfile';
import { audioEngine } from '../utils/audioEngine';

export default function Experience() {
  const { experience } = ashlinProfile;
  const [activeMission, setActiveMission] = useState(0);

  const getMissionIcon = (index) => {
    switch (index) {
      case 0: return <Plane className="w-5 h-5 text-cyan-400" />;
      case 1: return <Brain className="w-5 h-5 text-purple-400" />;
      case 2: return <Database className="w-5 h-5 text-emerald-400" />;
      default: return <Activity className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="w-full max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
              PHASE 02
            </span>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
              MISSION LOGS // EXPERIENCE
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            TECHNICAL DEPLOYMENTS [03/03]
          </div>
        </div>

        {/* Mission Tabs / Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {experience.map((item, idx) => {
            const isSelected = activeMission === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audioEngine.playTactileBlip(600 + idx * 80, 0.03);
                  setActiveMission(idx);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-cyan-sm'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-cyan-500/30 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold tracking-wider text-cyan-400">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-cyan-500/20 text-zinc-400">
                    {item.badge}
                  </span>
                </div>
                <div className="font-space font-bold text-sm text-white truncate">
                  {item.role}
                </div>
                <div className="text-xs text-zinc-400 truncate mt-0.5 font-mono">
                  {item.company}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mission HUD Console Card */}
        {(() => {
          const mission = experience[activeMission];
          return (
            <div className="hud-card rounded-2xl p-6 sm:p-8 border border-cyan-400/30 relative">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              {/* Status Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-cyan-500/20 mb-6 font-mono text-xs">
                <div className="flex items-center gap-2">
                  {getMissionIcon(activeMission)}
                  <span className="font-orbitron font-bold text-cyan-300 text-sm">
                    {mission.code}: {mission.company}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {mission.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {mission.location}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px]">
                    STATUS: COMPLETED
                  </span>
                </div>
              </div>

              {/* Mission Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-1">
                    {mission.role}
                  </h3>
                  <div className="font-mono text-xs text-cyan-400/80">
                    SYSTEM ENVIRONMENT: {mission.environment}
                  </div>
                </div>

                {/* Key accomplishments */}
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    MISSION DELIVERABLES & ARCHITECTURAL LOGS:
                  </div>
                  {mission.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-3.5 rounded-lg bg-black/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-colors flex items-start gap-3 text-sm text-zinc-200 font-inter leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Metric display if applicable */}
                {mission.metrics && (
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-400/40 flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider">
                      PERFORMANCE SIGNAL:
                    </span>
                    <span className="font-orbitron font-bold text-cyan-300 text-sm">
                      {mission.metrics}
                    </span>
                  </div>
                )}

                {/* Technologies Utilized */}
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    TECHNOLOGIES ENGAGED:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mission.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-cyan-500/20 text-cyan-200 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
}
