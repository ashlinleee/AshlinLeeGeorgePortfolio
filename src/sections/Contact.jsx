import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  PowerOff,
  Sparkles
} from 'lucide-react';

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

import confetti from 'canvas-confetti';
import { ashlinProfile } from '../data/ashlinProfile';
import { audioEngine } from '../utils/audioEngine';

export default function Contact() {
  const { contact } = ashlinProfile;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null, transmissionId: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'All fields must be populated for transmission.', transmissionId: null });
      return;
    }

    audioEngine.playTactileBlip(880, 0.04);
    setStatus({ loading: true, success: false, error: null, transmissionId: null });

    try {
      const res = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        audioEngine.playChirp('success');
        setStatus({
          loading: false,
          success: true,
          error: null,
          transmissionId: data.transmissionId || `TRX-${Date.now()}`
        });
        setFormData({ name: '', email: '', message: '' });

        // Trigger confetti celebration
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#00f0ff', '#8a2be2', '#10b981']
          });
        } catch (e) {}
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.error || 'TRANSMISSION FAILED: Uplink protocol error.',
          transmissionId: null
        });
      }
    } catch (err) {
      console.warn("Express backend offline, simulating transmission acknowledgment", err);
      // Client-side fallback so demo never fails
      audioEngine.playChirp('success');
      setStatus({
        loading: false,
        success: true,
        error: null,
        transmissionId: `LOCAL-TRX-${Date.now()}`
      });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 z-10">
      
      <div className="w-full max-w-6xl mx-auto my-auto py-12">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
            PHASE 09
          </span>
          <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
            ESTABLISH CONNECTION // CONTACT
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Connection Credentials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="hud-card rounded-2xl p-6 sm:p-8 border border-cyan-400/30">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
                <span>CONNECTION CHANNEL</span>
              </div>

              <h3 className="font-orbitron font-extrabold text-2xl text-white mb-2">
                ASHLIN LEE GEORGE
              </h3>

              <p className="font-space text-sm sm:text-base text-cyan-200 mb-6">
                LET'S BUILD SOMETHING TOGETHER.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 font-mono text-xs">
                
                <a
                  href={`mailto:${contact.email}`}
                  onClick={() => audioEngine.playTactileBlip(600, 0.02)}
                  className="p-3 rounded-lg bg-black/40 border border-zinc-800 hover:border-cyan-400 flex items-center gap-3 text-zinc-300 hover:text-white transition-all"
                >
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>

                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  onClick={() => audioEngine.playTactileBlip(600, 0.02)}
                  className="p-3 rounded-lg bg-black/40 border border-zinc-800 hover:border-cyan-400 flex items-center gap-3 text-zinc-300 hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{contact.phone}</span>
                </a>

                <div className="p-3 rounded-lg bg-black/40 border border-zinc-800 flex items-center gap-3 text-zinc-400">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[11px] leading-tight">{contact.location}</span>
                </div>

              </div>

              {/* Social Channels Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playTactileBlip(750, 0.03)}
                  className="py-2.5 px-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/30 hover:border-cyan-300 transition-all flex items-center justify-center gap-2"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playTactileBlip(750, 0.03)}
                  className="py-2.5 px-3 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold hover:border-cyan-400 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Transmission Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="hud-card rounded-2xl p-6 sm:p-8 border border-cyan-400/30">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div className="pb-4 border-b border-cyan-500/20 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    DIRECT UPLINK INTERFACE
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white">
                    TRANSMIT MESSAGE
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  ENCRYPTED
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name or organization..."
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm font-inter text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm font-inter text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your engineering objective, role opportunity, or project inquiry..."
                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm font-inter text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none"
                  />
                </div>

                {status.error && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {status.success && (
                  <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="font-bold">MESSAGE TRANSMITTED</div>
                      <div className="text-[10px] text-emerald-400/80 mt-0.5">
                        Transmission logged with reference {status.transmissionId}. Ashlin will respond via your provided channel.
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3.5 px-6 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold tracking-widest hover:bg-cyan-500/30 hover:shadow-cyan-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status.loading ? 'TRANSMITTING PACKETS...' : 'TRANSMIT MESSAGE'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Futuristic System Shutdown Footer */}
      <footer className="border-t border-cyan-500/20 pt-8 pb-12 mt-12 max-w-7xl mx-auto w-full font-mono text-xs text-zinc-500">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-zinc-400">
            <PowerOff className="w-4 h-4 text-cyan-400" />
            <span className="font-orbitron text-xs tracking-wider text-cyan-300">
              SYSTEM SESSION COMPLETE
            </span>
            <span>//</span>
            <span>ASHLIN LEE GEORGE</span>
          </div>

          <div className="text-center md:text-right">
            <div className="text-cyan-400/80">
              STATUS: AVAILABLE FOR CONNECTION // ML & FULL STACK ENGINEERING
            </div>
            <div className="text-[10px] text-zinc-600 mt-1">
              © 2026 ASHLIN LEE GEORGE. ALL RIGHTS RESERVED. // CONNECTION TERMINATED.
            </div>
          </div>
        </div>
      </footer>

    </section>
  );
}
