import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Radio,
  Sparkles,
  Bot,
  Compass,
  ShieldCheck,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { useVoiceRecognition } from "../hooks/useVoiceRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { ashlinProfile } from "../data/ashlinProfile";
import { audioEngine } from "../utils/audioEngine";

export default function VoiceMode({ isOpen, onClose, onNavigate }) {
  const [conversationState, setConversationState] = useState("idle"); // 'idle' | 'listening' | 'processing' | 'speaking'
  const [userQuery, setUserQuery] = useState("");
  const [spokenAnswer, setSpokenAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [micAutoRestart, setMicAutoRestart] = useState(true);

  const { isSpeaking, speak, stop: stopSpeaking } = useSpeechSynthesis();

  // Knowledge lookup & section navigation engine
  const processVoiceQuestion = (queryText) => {
    if (!queryText) return;
    setUserQuery(queryText);
    setConversationState("processing");
    audioEngine.playChirp("success");

    const q = queryText.toLowerCase().trim();
    let reply = "";
    let targetSection = null;

    if (
      q.includes("who is") ||
      q.includes("about") ||
      q.includes("introduce")
    ) {
      reply = `Ashlin Lee George is a Computer Science Engineering student at ITM Skills University with a CGPA of 9.08 till Semester 6. She specializes in AI, machine learning research, aerospace software systems, and full-stack development.`;
      targetSection = 1;
    } else if (
      q.includes("hal") ||
      q.includes("hindustan aeronautics") ||
      q.includes("aerospace") ||
      q.includes("wpf") ||
      q.includes("flight")
    ) {
      reply = `At MCSRDC, Hindustan Aeronautics Limited in Bangalore, Ashlin explored software architecture on a Windows-based flight-worthy computer using the WPF .NET platform, real-time systems, and sensor communication.`;
      targetSection = 2;
    } else if (
      q.includes("inventuriz") ||
      q.includes("research associate") ||
      q.includes("stock")
    ) {
      reply = `At Inventuriz Labs in Bangalore, Ashlin served as an AI/ML Research Associate Intern, building and optimizing deep learning models for stock prediction and brain tumour detection with 97% accuracy using Python and TensorFlow.`;
      targetSection = 2;
    } else if (
      q.includes("letsupgrade") ||
      q.includes("data management") ||
      q.includes("redundancy") ||
      q.includes("30%")
    ) {
      reply = `At LetsUpgrade in Mumbai, Ashlin was a Data Management Intern, improving class-12 portal data accuracy by 30% and reducing redundancy through backend restructuring.`;
      targetSection = 2;
    } else if (
      q.includes("experience") ||
      q.includes("work") ||
      q.includes("internship") ||
      q.includes("missions")
    ) {
      reply = `Ashlin has completed technical internships at Hindustan Aeronautics Limited in aerospace software, Inventuriz Labs in deep learning research, and LetsUpgrade in data management.`;
      targetSection = 2;
    } else if (
      q.includes("bhumi") ||
      q.includes("volunteer") ||
      q.includes("ngo") ||
      q.includes("social") ||
      q.includes("students")
    ) {
      reply = `With Bhumi NGO, Ashlin mentored 80+ students through online sessions in Machine Learning fundamentals, boosting digital literacy and problem-solving abilities.`;
      targetSection = 3;
    } else if (
      q.includes("brain tumour") ||
      q.includes("brain tumor") ||
      q.includes("mri") ||
      q.includes("cnn")
    ) {
      reply = `Ashlin developed a deep learning Convolutional Neural Network to classify MRI images into tumour and non-tumour categories with approximately 97% accuracy.`;
      targetSection = 4;
    } else if (
      q.includes("down under") ||
      q.includes("australia") ||
      q.includes("travel")
    ) {
      reply = `Ashlin engineered Down Under Connect, a full-stack Australian travel platform built with MERN and PHP, generating over 300 user interactions.`;
      targetSection = 4;
    } else if (
      q.includes("micekart") ||
      q.includes("mice") ||
      q.includes("event")
    ) {
      reply = `Ashlin built MICEkart, a responsive event management platform projecting a 32% increase in registrations and a 24% reduction in drop-offs.`;
      targetSection = 4;
    } else if (
      q.includes("project") ||
      q.includes("system") ||
      q.includes("built")
    ) {
      reply = `Ashlin's primary projects include Brain Tumour Detection using Deep Learning CNNs, Down Under Connect Australian travel platform, and the MICEkart corporate event platform.`;
      targetSection = 4;
    } else if (
      q.includes("skill") ||
      q.includes("tech stack") ||
      q.includes("technolog") ||
      q.includes("programming") ||
      q.includes("testing") ||
      q.includes("database")
    ) {
      reply = `Ashlin's technical skills span 9 domains including Python, JavaScript, C++, React.js, Node.js, Express.js, PHP, MongoDB, SQL, automated testing with Selenium and Cypress, AI and Machine Learning, Data Science, AWS Cloud, and Figma.`;
      targetSection = 4;
    } else if (
      q.includes("cgpa") ||
      q.includes("gpa") ||
      q.includes("grade") ||
      q.includes("marks")
    ) {
      reply = `Ashlin maintains a CGPA of 9.08 out of 10 through Semester 6 in Computer Science Engineering at ITM Skills University.`;
      targetSection = 1;
    } else if (
      q.includes("education") ||
      q.includes("college") ||
      q.includes("university") ||
      q.includes("degree")
    ) {
      reply = `Ashlin is pursuing a B.Tech in Computer Science Engineering at ITM Skills University (2023–2027) with a CGPA of 9.08. She also scored 96% in HSC and 97% in SSLC.`;
      targetSection = 6;
    } else if (
      q.includes("certification") ||
      q.includes("aws") ||
      q.includes("cloud practitioner")
    ) {
      reply = `Ashlin holds two official AWS certifications: AWS Cloud Practitioner Essentials and AWS Technical Essentials, earned in 2025.`;
      targetSection = 6;
    } else if (q.includes("language") || q.includes("speak")) {
      reply = `Ashlin is proficient in English, conversational in Hindi and Kannada, and native in Malayalam.`;
      targetSection = 7;
    } else if (
      q.includes("interest") ||
      q.includes("hobby") ||
      q.includes("baking") ||
      q.includes("painting")
    ) {
      reply = `Outside of technology, Ashlin enjoys Baking & Painting, Travel & Exploration, Fashion & Visual Aesthetics.`;
      targetSection = 7;
    } else if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("reach") ||
      q.includes("hire")
    ) {
      reply = `You can connect with Ashlin at ashlinleegeorge@gmail.com, or through her LinkedIn and GitHub profiles.`;
      targetSection = 9;
    } else if (q.includes("github")) {
      reply = `Opening Ashlin's GitHub profile.`;
      window.open(
        ashlinProfile.contact.github,
        "_blank",
        "noopener,noreferrer",
      );
    } else if (q.includes("linkedin")) {
      reply = `Opening Ashlin's LinkedIn profile.`;
      window.open(
        ashlinProfile.contact.linkedin,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      reply = `That information isn't available in Ashlin's portfolio. You can ask about her HAL experience, deep learning research, projects, skills, or education.`;
    }

    setSpokenAnswer(reply);
    setHistory((prev) => [{ q: queryText, a: reply }, ...prev]);

    // Automatically navigate the portfolio to the relevant section on screen
    if (targetSection !== null && onNavigate) {
      onNavigate(targetSection);
    }

    // Speak the answer aloud
    setConversationState("speaking");
    speak(reply);
  };

  const {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
  } = useVoiceRecognition({
    onCommand: (text) => {
      processVoiceQuestion(text);
    },
  });

  // Watch speech synthesis finish to re-prompt for continuous dialogue
  useEffect(() => {
    if (!isSpeaking && conversationState === "speaking") {
      const timer = setTimeout(() => {
        setConversationState("listening");
        if (micAutoRestart && isSupported) {
          startListening();
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [
    isSpeaking,
    conversationState,
    micAutoRestart,
    isSupported,
    startListening,
  ]);

  // When voice mode opens, start listening immediately
  useEffect(() => {
    if (isOpen) {
      audioEngine.playChirp("success");
      setConversationState("listening");
      if (isSupported) {
        startListening();
      }
      // Initial speech welcome if not spoken yet
      if (!history.length) {
        speak(
          "Voice mode active. Ask me anything about Ashlin's experience, projects, or skills.",
        );
      }
    } else {
      stopSpeaking();
      stopListening();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-10 select-none animate-fadeIn">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 animate-pulse">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="font-orbitron font-bold text-sm tracking-widest text-cyan-300 flex items-center gap-2">
              TALK TO ASHLIN'S PORTFOLIO
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-mono">
                AI VOICE OS
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Speak naturally — portfolio answers and navigates live
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={() => {
                stopSpeaking();
                setConversationState("listening");
              }}
              className="px-3 py-1.5 rounded-lg border border-purple-400/40 bg-purple-950/40 text-purple-300 font-mono text-xs flex items-center gap-1.5"
            >
              <VolumeX className="w-4 h-4" />
              <span>MUTE VOICE</span>
            </button>
          )}

          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              onClose();
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Neural Voice Orb Visualizer */}
      <div className="my-auto flex flex-col items-center text-center max-w-2xl space-y-6">
        {/* Animated Cybernetic Voice Core Orb */}
        <div
          onClick={() => {
            if (isListening) stopListening();
            else startListening();
          }}
          className="cursor-pointer relative flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 rounded-full transition-transform hover:scale-105"
        >
          {/* Outer Pulsing Glow Rings */}
          <div
            className={`absolute inset-0 rounded-full border transition-all duration-700 ${
              isSpeaking
                ? "border-purple-400/60 shadow-[0_0_60px_rgba(168,85,247,0.4)] animate-ping"
                : isListening
                  ? "border-cyan-400/60 shadow-[0_0_60px_rgba(0,240,255,0.4)] animate-pulse"
                  : "border-zinc-700"
            }`}
          />

          <div
            className={`absolute inset-4 rounded-full border-2 transition-all duration-500 ${
              isSpeaking
                ? "border-purple-400/40 shadow-violet-glow"
                : isListening
                  ? "border-cyan-400/40 shadow-cyan-glow"
                  : "border-zinc-800"
            }`}
          />

          {/* Center Orb Core */}
          <div
            className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center transition-all ${
              isSpeaking
                ? "bg-gradient-to-tr from-purple-900/60 to-purple-600/30 border border-purple-400 text-purple-200"
                : isListening
                  ? "bg-gradient-to-tr from-cyan-950/70 to-cyan-500/25 border border-cyan-400 text-cyan-200"
                  : "bg-zinc-900 border border-zinc-700 text-zinc-400"
            }`}
          >
            {isSpeaking ? (
              <div className="flex items-center gap-1 h-8">
                {[60, 100, 40, 80, 50, 90, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-purple-300 rounded-full animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDuration: `${0.3 + (i % 3) * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            ) : isListening ? (
              <div className="flex flex-col items-center">
                <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-300 animate-bounce" />
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 mt-1">
                  LISTENING
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <MicOff className="w-8 h-8 text-zinc-500" />
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 mt-1">
                  TAP TO SPEAK
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Live Status Description */}
        <div className="space-y-2">
          <div className="font-orbitron font-bold text-lg sm:text-2xl text-white">
            {isSpeaking
              ? "ASHLIN'S PORTFOLIO IS SPEAKING..."
              : isListening
                ? "LISTENING TO YOU... SPEAK NOW"
                : "VOICE SYSTEM ON STANDBY"}
          </div>

          {/* User's spoken query transcription */}
          {transcript && isListening && (
            <div className="text-cyan-300 font-mono text-sm sm:text-base italic px-4 py-2 rounded-lg bg-cyan-950/30 border border-cyan-500/30 max-w-xl mx-auto">
              "{transcript}"
            </div>
          )}

          {userQuery && !transcript && (
            <div className="text-zinc-400 font-mono text-xs sm:text-sm">
              YOU ASKED:{" "}
              <span className="text-cyan-300 font-bold">"{userQuery}"</span>
            </div>
          )}
        </div>

        {/* Spoken Answer Live Text Display */}
        {spokenAnswer && (
          <div className="hud-card rounded-xl p-4 sm:p-6 border border-cyan-400/40 text-left max-w-xl mx-auto">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>PORTFOLIO SPOKEN RESPONSE</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> PORTFOLIO-BASED
              </span>
            </div>
            <p className="font-inter text-sm sm:text-base text-zinc-100 leading-relaxed">
              {spokenAnswer}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Suggested Voice Questions */}
      <div className="w-full max-w-4xl pt-4 border-t border-cyan-500/20">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>OR TAP TO ASK BY VOICE:</span>
          <span className="text-cyan-400/70 text-[11px]">
            Direct Speech Questions
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "Who is Ashlin?",
            "Tell me about HAL",
            "What did she build at Inventuriz Labs?",
            "What is her CGPA?",
            "Show me her projects",
            "What are her technical skills?",
            "How can I contact Ashlin?",
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => processVoiceQuestion(prompt)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-cyan-950/60 border border-zinc-800 hover:border-cyan-400/60 text-xs font-mono text-zinc-300 hover:text-cyan-200 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>"{prompt}"</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
