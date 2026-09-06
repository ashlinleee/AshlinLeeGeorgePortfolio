import React from 'react';
import { Heart, Users, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { ashlinProfile } from '../data/ashlinProfile';

export default function SocialImpact() {
  const { socialImpact } = ashlinProfile;

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="w-full max-w-5xl">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="font-orbitron text-xs font-bold text-amber-400 tracking-widest px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/30">
            PHASE 03
          </span>
          <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-amber">
            HUMAN CONNECTION PROTOCOL
          </h2>
        </div>

        {/* Warmer, softer aesthetic panel */}
        <div className="rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#0c0906]/85 backdrop-blur-xl shadow-[0_12px_45px_-10px_rgba(245,158,11,0.15)] relative overflow-hidden">
          
          {/* Subtle warm glow orbs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

          {/* Core Human Statement */}
          <div className="border-b border-amber-500/20 pb-6 mb-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase mb-2">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20 animate-pulse" />
              <span>SOCIAL INTERNSHIP // IMPACT ARCHITECTURE</span>
            </div>
            <blockquote className="font-space font-semibold text-xl sm:text-2xl text-amber-100 italic">
              "{socialImpact.message}"
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Impact Stat Badge */}
            <div className="md:col-span-5 p-6 rounded-xl bg-black/40 border border-amber-500/30 text-center flex flex-col items-center justify-center">
              <div className="p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
                <Users className="w-8 h-8" />
              </div>
              <div className="font-orbitron font-extrabold text-4xl text-amber-300">
                80+
              </div>
              <div className="font-mono text-xs text-amber-200/80 mt-1 uppercase tracking-wider">
                STUDENTS TRAINED IN PYTHON
              </div>
              <div className="mt-3 text-[11px] font-mono text-zinc-400">
                {socialImpact.organization} • {socialImpact.period}
              </div>
            </div>

            {/* Right Accomplishments & Pedagogy */}
            <div className="md:col-span-7 space-y-4">
              <div className="text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                COMMUNITY EDUCATION & DIGITAL LITERACY:
              </div>

              {socialImpact.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/40 border border-amber-500/20 flex items-start gap-3 text-sm text-zinc-200 font-inter leading-relaxed"
                >
                  <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-2">
                {socialImpact.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono"
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
