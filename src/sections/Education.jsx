import React from "react";
import { Calendar, GraduationCap } from "lucide-react";
import { ashlinProfile } from "../data/ashlinProfile";

export default function Education() {
  const { education } = ashlinProfile;

  return (
    <section className="relative flex items-center justify-center px-6 py-12 sm:px-12 sm:py-16 z-10">
      <div className="w-full max-w-6xl space-y-12">
        {/* Academic Core Section */}
        <div>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
              PHASE 05
            </span>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
              ACADEMIC CORE
            </h2>
          </div>

          {/* Academic Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="hud-card rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between"
              >
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                    <span className="font-mono text-xs text-cyan-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        edu.status === "CURRENTLY ENROLLED"
                          ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300"
                          : "bg-zinc-900 border border-zinc-700 text-zinc-400"
                      }`}
                    >
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-base sm:text-lg text-white mb-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono mb-4">
                    {edu.institution}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400">SCORE</span>
                  <div className="text-right">
                    <div className="font-orbitron font-extrabold text-lg text-cyan-300">
                      {edu.score}
                    </div>
                    {edu.scoreDetail && (
                      <div className="text-[10px] font-mono text-cyan-400/80">
                        {edu.scoreDetail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
