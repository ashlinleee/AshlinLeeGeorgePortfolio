import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  User, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { audioEngine } from '../utils/audioEngine';
import { ashlinProfile } from '../data/ashlinProfile';

const QUICK_PROMPTS = [
  "ABOUT ASHLIN",
  "EXPERIENCE",
  "PROJECTS",
  "TECH STACK",
  "EDUCATION",
  "CERTIFICATIONS",
  "CONTACT"
];

export default function Chatbot({ isOpen, onToggle, onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      role: 'assistant',
      text: "System initialized. I am Ashlin Lee George's AI Portfolio Assistant. I can provide details about Ashlin's aerospace software experience, AI/ML research at Inventuriz Labs, full-stack projects, academic scores, and technical capabilities."
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false); // Silent by default for text bot

  const messagesContainerRef = useRef(null);
  const { isSpeaking, speak, stop: stopSpeaking } = useSpeechSynthesis();

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    audioEngine.playTactileBlip(640, 0.03);

    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      let replyText = "";
      if (response.ok) {
        const data = await response.json();
        replyText = data.reply;
      } else {
        throw new Error("Server response not ok");
      }

      const botMsg = { id: `b-${Date.now()}`, role: 'assistant', text: replyText };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);

      if (ttsEnabled) {
        speak(replyText);
      }
    } catch (err) {
      console.warn("Express backend unavailable, using client-side deterministic knowledge engine", err);
      const fallbackReply = clientDeterministicReply(query);
      const botMsg = { id: `b-${Date.now()}`, role: 'assistant', text: fallbackReply };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);

      if (ttsEnabled) {
        speak(fallbackReply);
      }
    }
  };

  // Client deterministic fallback
  function clientDeterministicReply(query) {
    const q = query.toLowerCase();
    if (q.includes('about') || q.includes('who is')) {
      return `${ashlinProfile.identity.name} is a ${ashlinProfile.identity.tagline} at ${ashlinProfile.identity.university} (${ashlinProfile.identity.status}) with a CGPA of ${ashlinProfile.identity.cgpa} (${ashlinProfile.identity.cgpaNote}). ${ashlinProfile.identity.summary}`;
    }
    if (q.includes('hal') || q.includes('aerospace')) {
      const hal = ashlinProfile.experience[0];
      return `At ${hal.company} in Bangalore (${hal.period}), Ashlin was a ${hal.role}, exploring flight-worthy computer architecture with WPF .NET, real-time software systems, and sensor communication.`;
    }
    if (q.includes('inventuriz') || q.includes('ai') || q.includes('deep learning')) {
      const inv = ashlinProfile.experience[1];
      return `At ${inv.company} in Bangalore (${inv.period}), Ashlin served as an ${inv.role}, building deep learning models for stock prediction and brain tumour detection with 90%+ accuracy using Python and TensorFlow.`;
    }
    if (q.includes('project') || q.includes('system')) {
      return `Ashlin's key projects include Brain Tumour Detection using Deep Learning (CNN ~90% accuracy), Down Under Connect (Full-stack Australian travel platform), and MICEkart (Event management platform).`;
    }
    if (q.includes('education') || q.includes('cgpa')) {
      return `Ashlin is pursuing B.Tech in CSE at ITM Skills University (2023–2027) with a CGPA of 9.08 till Semester 6. She completed HSC with 96% and SSLC with 97%.`;
    }
    if (q.includes('skill') || q.includes('tech stack')) {
      return `Ashlin's technical skills include React.js, JavaScript, HTML/CSS, Python, SQL, MongoDB, Node.js, Express.js, MERN stack, AWS Cloud, and Figma.`;
    }
    if (q.includes('certif')) {
      return `Ashlin holds AWS Cloud Practitioner Essentials (2025) and AWS Technical Essentials (2025) certifications.`;
    }
    if (q.includes('contact') || q.includes('email')) {
      return `Connect with Ashlin at ashlinleegeorge@gmail.com, +91 63666 08726, or linkedin.com/in/ashlin-lee-george/`;
    }
    return "That information isn't available in Ashlin's portfolio.";
  }

  // Voice recognition for chatbot
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported: isSpeechSupported
  } = useVoiceRecognition({
    onCommand: (spokenText) => {
      setInputMessage(spokenText);
      handleSendMessage(spokenText);
    }
  });

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <>
      {/* 
        FLOATING LAUNCHER BUTTON:
        Fixed at bottom-6 right-6 with high z-[90] so it is visible and clickable 
        AT ALL TIMES across every section of the portfolio!
      */}
      {!isOpen && (
        <button
          onClick={() => {
            audioEngine.playTactileBlip(800, 0.04);
            onToggle();
          }}
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 px-4 py-3 rounded-full border border-purple-400/50 bg-[#0a0714]/90 backdrop-blur-md text-purple-200 font-mono text-xs tracking-wider shadow-violet-glow hover:border-purple-300 hover:scale-105 transition-all duration-300 group cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-purple-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          </div>
          <span className="font-orbitron font-bold">ASH</span>
        </button>
      )}

      {/* 
        EXPANDABLE CHAT MODAL:
        Fixed at bottom-6 right-6 with z-[100], opening right where the user is.
      */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 sm:right-6 sm:left-auto sm:w-[440px] z-[100] hud-card rounded-2xl p-4 sm:p-5 border border-purple-500/50 bg-[#07050f]/95 shadow-violet-glow flex flex-col h-[520px] max-h-[85vh]">
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40">
                <Bot className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <div className="font-orbitron font-bold text-xs tracking-wider text-purple-200 flex items-center gap-2">
                  ASH AI
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice Read Aloud Toggle */}
              <button
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setTtsEnabled(!ttsEnabled);
                }}
                title={ttsEnabled ? "Voice Output Active" : "Voice Output Muted"}
                className={`p-1.5 rounded border transition-colors ${
                  ttsEnabled
                    ? 'border-purple-400/40 text-purple-300 bg-purple-950/40'
                    : 'border-zinc-800 text-zinc-500'
                }`}
              >
                {ttsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => {
                  stopSpeaking();
                  stopListening();
                  onToggle();
                }}
                className="p-1.5 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto py-3 space-y-3 font-mono text-xs pr-1">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="p-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-400 shrink-0 mt-0.5">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl border text-[11px] leading-relaxed max-w-[85%] ${
                      isUser
                        ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-100 rounded-br-none'
                        : 'bg-zinc-900/80 border-purple-500/25 text-zinc-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}

                    {!isUser && (
                      <div className="mt-2 pt-1.5 border-t border-purple-500/10 flex items-center justify-between text-[9px] text-zinc-400">
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <ShieldCheck className="w-3 h-3" /> Portfolio-based
                        </span>
                        <button
                          onClick={() => speak(msg.text)}
                          className="hover:text-purple-300 flex items-center gap-1"
                        >
                          <Volume2 className="w-2.5 h-2.5" /> Speak
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="p-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono p-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>RETRIEVING PORTFOLIO DATA...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="py-2 border-t border-purple-500/15 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(`Tell me about ${prompt.toLowerCase()}`)}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-zinc-900/70 hover:bg-purple-950/50 border border-zinc-800 hover:border-purple-400/60 text-[10px] font-mono text-zinc-300 hover:text-purple-200 transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="pt-2 flex items-center gap-2 border-t border-purple-500/20"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Ashlin's work, AI, HAL, projects..."
                className="w-full bg-zinc-900/70 border border-purple-500/30 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
              />
              {transcript && isListening && (
                <span className="absolute right-3 top-2.5 text-[9px] font-mono text-cyan-400 animate-pulse">
                  Listening...
                </span>
              )}
            </div>

            {/* Mic Input */}
            {isSpeechSupported && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop listening" : "Speak question"}
                className={`p-2 rounded-lg border transition-all ${
                  isListening
                    ? 'bg-red-500/30 border-red-400 text-red-300 animate-pulse'
                    : 'bg-zinc-900 border-purple-500/30 text-purple-300 hover:bg-purple-950/40'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            {/* Submit Send */}
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 rounded-lg bg-purple-500/30 border border-purple-400 text-purple-200 hover:bg-purple-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
