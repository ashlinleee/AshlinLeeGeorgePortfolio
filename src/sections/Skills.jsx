import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Database,
  ShieldCheck,
  Layers,
  Cpu,
  Cloud,
  Wrench,
  Server,
  Palette,
  Sparkles,
  Globe,
  Send,
  Share2,
  Search,
  Sliders,
  BarChart3,
  Target,
  LineChart,
  Zap,
  Code,
  FileCode,
  Play,
  Gauge,
  GitBranch,
  Network,
  Users,
  Brain,
  Atom,
  RotateCw,
  Compass,
  Sparkle,
} from "lucide-react";
import { ashlinProfile } from "../data/ashlinProfile";

// Helper to determine hobby icon
function getHobbyIcon(name, className = "w-4 h-4") {
  switch (name) {
    case "Baking":
      return <Sparkles className={className} />;
    case "Painting":
      return <Palette className={className} />;
    case "Travel & Exploration":
      return <Compass className={className} />;
    case "Fashion & Visual Aesthetics":
      return <Sparkle className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

// Helper to determine display formatting and size based on content length
function getSkillDisplay(skillName) {
  switch (skillName) {
    case "Feature Engineering":
      return { line1: "Feature", line2: "Engineering", isLarge: true };
    case "Feature Selection":
      return { line1: "Feature", line2: "Selection", isLarge: true };
    case "Model Evaluation":
      return { line1: "Model", line2: "Evaluation", isLarge: true };
    case "RESTful APIs":
      return { line1: "RESTful", line2: "APIs", isLarge: true };
    case "Exploratory Data Analysis (EDA)":
      return {
        line1: "Exploratory Data",
        line2: "Analysis (EDA)",
        isLarge: true,
      };
    case "Statistical Analysis":
      return { line1: "Statistical", line2: "Analysis", isLarge: true };
    case "Public Speaking & Presentation":
      return {
        line1: "Public Speaking &",
        line2: "Presentation",
        isLarge: true,
      };
    case "Team Collaboration & Leadership":
      return { line1: "Team Collab &", line2: "Leadership", isLarge: true };
    case "Critical Thinking & Problem Solving":
      return {
        line1: "Critical Thinking &",
        line2: "Problem Solving",
        isLarge: true,
      };
    case "Adaptability & Fast Learning":
      return { line1: "Adaptability &", line2: "Fast Learning", isLarge: true };
    default:
      return { line1: skillName, line2: null, isLarge: false };
  }
}

// Helper to get domain icon
function getDomainIcon(key, className = "w-5 h-5") {
  switch (key) {
    case "all":
      return <Network className={className} />;
    case "frontend":
      return <Code className={className} />;
    case "backend":
      return <Server className={className} />;
    case "ai":
      return <Cpu className={className} />;
    case "programming":
      return <Terminal className={className} />;
    case "databases":
      return <Database className={className} />;
    case "testing":
      return <ShieldCheck className={className} />;
    case "cloud":
      return <Cloud className={className} />;
    case "data":
      return <BarChart3 className={className} />;
    case "uiux":
      return <Palette className={className} />;
    case "soft":
      return <Brain className={className} />;
    default:
      return <Layers className={className} />;
  }
}

// Helper to get skill icon
function getSkillIcon(skillName, className = "w-5 h-5") {
  switch (skillName) {
    case "React.js":
      return (
        <svg className={className} viewBox="0 0 115.3 100" fill="currentColor">
          <ellipse
            cx="57.65"
            cy="50"
            rx="55"
            ry="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          />
          <ellipse
            cx="57.65"
            cy="50"
            rx="55"
            ry="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            transform="rotate(60 57.65 50)"
          />
          <ellipse
            cx="57.65"
            cy="50"
            rx="55"
            ry="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            transform="rotate(120 57.65 50)"
          />
          <circle cx="57.65" cy="50" r="9" fill="currentColor" />
        </svg>
      );
    case "HTML":
      return <FileCode className={className} />;
    case "CSS":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 3l1.5 16 6.5 2 6.5-2 1.5-16H4z" />
          <path d="M7.5 7h9l-.5 4h-8l.5 4 4.5 1.5 4.5-1.5.3-2.5" />
        </svg>
      );
    case "Python":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2c-3.5 0-5 1.5-5 3.5v2.5h5v1H5c-2 0-3.5 1.5-3.5 5s1.5 5 3.5 5h2v-2.5c0-2 1.5-3.5 3.5-3.5h5v-1h-7v-2.5c0-1.5 1-2.5 2.5-2.5h8.5c1.5 0 2.5-1 2.5-2.5V5.5C21.5 3.5 20 2 16.5 2H12z" />
          <circle cx="9" cy="5" r="0.8" fill="currentColor" />
          <circle cx="15" cy="19" r="0.8" fill="currentColor" />
        </svg>
      );
    case "JavaScript":
      return (
        <span className="font-mono font-black text-xs tracking-tighter">
          JS
        </span>
      );
    case "C++":
      return (
        <span className="font-mono font-black text-xs tracking-tighter">
          C++
        </span>
      );
    case "MongoDB":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2C8 6 6 11 12 22c6-11 4-16 0-20z" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      );
    case "SQL":
      return <Database className={className} />;
    case "Selenium":
      return (
        <span className="font-mono font-black text-xs tracking-tighter">
          Se
        </span>
      );
    case "Cypress":
      return <Play className={className} />;
    case "Jenkins":
      return <Wrench className={className} />;
    case "JMeter":
      return <Gauge className={className} />;
    case "Feature Engineering":
      return <Sliders className={className} />;
    case "Feature Selection":
      return <Target className={className} />;
    case "Model Evaluation":
      return <LineChart className={className} />;
    case "AWS":
      return <Cloud className={className} />;
    case "GitHub":
      return <GitBranch className={className} />;
    case "Postman":
      return <Send className={className} />;
    case "Web Hosting":
      return <Globe className={className} />;
    case "Node.js":
      return (
        <span className="font-mono font-black text-xs tracking-tighter">
          node
        </span>
      );
    case "Express.js":
      return <Zap className={className} />;
    case "PHP":
      return (
        <span className="font-mono font-black text-xs tracking-tighter">
          PHP
        </span>
      );
    case "RESTful APIs":
      return <Share2 className={className} />;
    case "Exploratory Data Analysis (EDA)":
      return <Search className={className} />;
    case "Statistical Analysis":
      return (
        <span className="font-mono font-black text-sm tracking-tighter">∑</span>
      );
    case "Figma":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="15" cy="6" r="3" />
          <circle cx="15" cy="12" r="3" />
          <circle cx="9" cy="18" r="3" />
          <path d="M6 3h6v6H6z" />
          <path d="M6 9h6v6H6z" />
        </svg>
      );
    case "Public Speaking & Presentation":
      return <Sparkles className={className} />;
    case "Team Collaboration & Leadership":
      return <Users className={className} />;
    case "Critical Thinking & Problem Solving":
      return <Brain className={className} />;
    case "Adaptability & Fast Learning":
      return <Zap className={className} />;
    default:
      return <Atom className={className} />;
  }
}

// Domain color schemes
const DOMAIN_THEMES = {
  frontend: {
    border: "border-cyan-400",
    text: "text-cyan-300",
    glow: "shadow-[0_0_25px_rgba(0,240,255,0.45)]",
    bg: "bg-cyan-950/50",
    line: "#00f0ff",
  },
  backend: {
    border: "border-purple-400",
    text: "text-purple-300",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.45)]",
    bg: "bg-purple-950/50",
    line: "#a855f7",
  },
  ai: {
    border: "border-fuchsia-400",
    text: "text-fuchsia-300",
    glow: "shadow-[0_0_25px_rgba(232,121,249,0.45)]",
    bg: "bg-fuchsia-950/50",
    line: "#e879f9",
  },
  programming: {
    border: "border-sky-400",
    text: "text-sky-300",
    glow: "shadow-[0_0_25px_rgba(56,189,248,0.45)]",
    bg: "bg-sky-950/50",
    line: "#38bdf8",
  },
  databases: {
    border: "border-emerald-400",
    text: "text-emerald-300",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.45)]",
    bg: "bg-emerald-950/50",
    line: "#10b981",
  },
  testing: {
    border: "border-teal-400",
    text: "text-teal-300",
    glow: "shadow-[0_0_25px_rgba(45,212,191,0.45)]",
    bg: "bg-teal-950/50",
    line: "#2dd4bf",
  },
  cloud: {
    border: "border-amber-400",
    text: "text-amber-300",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.45)]",
    bg: "bg-amber-950/50",
    line: "#f59e0b",
  },
  data: {
    border: "border-lime-400",
    text: "text-lime-300",
    glow: "shadow-[0_0_25px_rgba(163,230,53,0.45)]",
    bg: "bg-lime-950/50",
    line: "#a3e635",
  },
  uiux: {
    border: "border-rose-400",
    text: "text-rose-300",
    glow: "shadow-[0_0_25px_rgba(244,63,94,0.45)]",
    bg: "bg-rose-950/50",
    line: "#f43f5e",
  },
  soft: {
    border: "border-indigo-400",
    text: "text-indigo-300",
    glow: "shadow-[0_0_25px_rgba(129,140,248,0.45)]",
    bg: "bg-indigo-950/50",
    line: "#818cf8",
  },
};

// Global constellation map coordinates for the ALL view
const ALL_NETWORK_MAP = [
  // Frontend Cluster (top-center)
  { skill: "React.js", domainKey: "frontend", x: 44, y: 15 },
  { skill: "HTML", domainKey: "frontend", x: 53, y: 10 },
  { skill: "CSS", domainKey: "frontend", x: 60, y: 17 },

  // Backend & APIs Cluster (top-right)
  { skill: "Node.js", domainKey: "backend", x: 74, y: 14 },
  { skill: "Express.js", domainKey: "backend", x: 84, y: 12 },
  { skill: "PHP", domainKey: "backend", x: 77, y: 26 },
  { skill: "RESTful APIs", domainKey: "backend", x: 90, y: 24 },

  // AI & Machine Learning Cluster (top-left)
  { skill: "Feature Engineering", domainKey: "ai", x: 12, y: 22 },
  { skill: "Feature Selection", domainKey: "ai", x: 23, y: 14 },
  { skill: "Model Evaluation", domainKey: "ai", x: 17, y: 34 },

  // Programming Languages Cluster (center)
  { skill: "Python", domainKey: "programming", x: 44, y: 44 },
  { skill: "JavaScript", domainKey: "programming", x: 54, y: 39 },
  { skill: "C++", domainKey: "programming", x: 50, y: 52 },

  // Databases Cluster (center-left)
  { skill: "MongoDB", domainKey: "databases", x: 30, y: 46 },
  { skill: "SQL", domainKey: "databases", x: 34, y: 58 },

  // Testing & QA Cluster (bottom-left)
  { skill: "Selenium", domainKey: "testing", x: 10, y: 72 },
  { skill: "Cypress", domainKey: "testing", x: 21, y: 68 },
  { skill: "Jenkins", domainKey: "testing", x: 11, y: 86 },
  { skill: "JMeter", domainKey: "testing", x: 22, y: 84 },

  // Cloud & Tools Cluster (bottom-center)
  { skill: "AWS", domainKey: "cloud", x: 39, y: 80 },
  { skill: "GitHub", domainKey: "cloud", x: 48, y: 72 },
  { skill: "Postman", domainKey: "cloud", x: 57, y: 78 },
  { skill: "Web Hosting", domainKey: "cloud", x: 48, y: 88 },

  // Data Science Cluster (bottom-right)
  { skill: "Exploratory Data Analysis (EDA)", domainKey: "data", x: 74, y: 76 },
  { skill: "Statistical Analysis", domainKey: "data", x: 89, y: 84 },

  // UI/UX Cluster (top-left inner)
  { skill: "Figma", domainKey: "uiux", x: 31, y: 17 },

  // Professional & Soft Skills Cluster (right-center)
  { skill: "Public Speaking & Presentation", domainKey: "soft", x: 77, y: 42 },
  { skill: "Team Collaboration & Leadership", domainKey: "soft", x: 91, y: 46 },
  {
    skill: "Critical Thinking & Problem Solving",
    domainKey: "soft",
    x: 76,
    y: 58,
  },
  { skill: "Adaptability & Fast Learning", domainKey: "soft", x: 90, y: 62 },
];

export default function Skills() {
  const { skills, skillRelations, certifications, interests } = ashlinProfile;
  const domainKeys = Object.keys(skills);

  // 'all' by default to show full floating network map
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Currently inspected/hovered node
  const [activeSkill, setActiveSkill] = useState("Python");

  // Track flipped hobby card for touch / tap toggle
  const [flippedCardIdx, setFlippedCardIdx] = useState(null);
  const toggleCardFlip = (idx) =>
    setFlippedCardIdx((prev) => (prev === idx ? null : idx));

  // Get active items to display based on filter
  const isAllView = selectedFilter === "all";
  const currentDomain = !isAllView ? skills[selectedFilter] : null;

  // Compute displayed nodes
  const displayedNodes = isAllView
    ? ALL_NETWORK_MAP
    : (currentDomain?.items || []).map((skill, index) => {
        const total = currentDomain.items.length;
        // Radial orbit in filtered view around center (50, 50)
        const radius = total === 1 ? 0 : total <= 3 ? 32 : 36;
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        return {
          skill,
          domainKey: selectedFilter,
          x: 50 + radius * Math.cos(angle),
          y: 50 + radius * Math.sin(angle),
        };
      });

  const activeRelation = skillRelations[activeSkill] || [
    {
      type: "Core Competency",
      label: `Essential engineering capability in Ashlin's portfolio.`,
    },
  ];

  return (
    <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 overflow-hidden select-none">
      <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
              PHASE 04
            </span>
            <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
              NEURAL CAPABILITY MATRIX
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-bold">
              {isAllView
                ? "30 NODES CLUSTERED // FULL SPECTRUM"
                : `${currentDomain?.title.toUpperCase()} // ${displayedNodes.length} NODES`}
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Cockpit Layout: Left Filter (3 cols), Right Full Network Map (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* LEFT PANEL: Domain Selector (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div className="hud-card rounded-2xl p-3 sm:p-4 border border-cyan-500/25 h-full flex flex-col justify-between relative">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div>
                <div className="px-2 pt-1 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-400 border-b border-cyan-500/20 flex items-center justify-between">
                  <span>FILTER DOMAIN</span>
                  <span className="text-zinc-500">[10]</span>
                </div>

                <div className="mt-3 space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                  {/* ALL SKILLS / FULL NETWORK OPTION */}
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${
                      selectedFilter === "all"
                        ? "bg-cyan-950/70 border-cyan-400 shadow-cyan-sm ring-1 ring-cyan-400/40"
                        : "bg-black/30 border-zinc-800/80 hover:border-cyan-500/40 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {selectedFilter === "all" && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                    )}

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        selectedFilter === "all"
                          ? "border-cyan-400 bg-cyan-900/40 text-cyan-300 shadow-cyan-sm"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 group-hover:border-cyan-500/40 group-hover:text-cyan-300"
                      }`}
                    >
                      <Network className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className={`font-orbitron font-bold text-xs tracking-wider truncate ${
                          selectedFilter === "all"
                            ? "text-cyan-200 glow-cyan"
                            : "text-zinc-200 group-hover:text-white"
                        }`}
                      >
                        ALL CAPABILITIES
                      </div>
                      <div className="font-mono text-[9px] text-zinc-500 truncate mt-0.5">
                        FULL NEURAL CONSTELLATION
                      </div>
                    </div>

                    {selectedFilter === "all" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-ping" />
                    )}
                  </button>

                  {/* DOMAIN SPECIFIC FILTERS */}
                  {domainKeys.map((key) => {
                    const domain = skills[key];
                    const isSelected = selectedFilter === key;
                    const theme = DOMAIN_THEMES[key] || DOMAIN_THEMES.frontend;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedFilter(key);
                          if (domain.items.length > 0)
                            setActiveSkill(domain.items[0]);
                        }}
                        className={`w-full p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 group relative overflow-hidden ${
                          isSelected
                            ? `${theme.bg} ${theme.border} ${theme.glow}`
                            : "bg-black/30 border-zinc-800/80 hover:border-cyan-500/40 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {isSelected && (
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${theme.border} shadow-[0_0_8px_currentColor]`}
                          />
                        )}

                        <div
                          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? `${theme.border} text-white`
                              : "border-zinc-800 bg-zinc-900/60 text-zinc-400 group-hover:border-cyan-500/40 group-hover:text-cyan-300"
                          }`}
                        >
                          {getDomainIcon(key, "w-3.5 h-3.5")}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div
                            className={`font-orbitron font-bold text-[11px] tracking-wider truncate ${
                              isSelected
                                ? "text-white"
                                : "text-zinc-300 group-hover:text-white"
                            }`}
                          >
                            {domain.title.toUpperCase()}
                          </div>
                          <div className="font-mono text-[8.5px] text-zinc-500 truncate">
                            {domain.items.length} SKILLS // {domain.subline}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-cyan-500/15 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span className="text-cyan-400/80">NEURAL ENGINE</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Expansive Floating Node Network Map (lg:col-span-9) */}
          <div className="lg:col-span-9 flex flex-col justify-between">
            <div className="hud-card rounded-2xl p-4 sm:p-6 border border-cyan-400/30 w-full h-full min-h-[620px] lg:min-h-[660px] flex flex-col justify-between relative overflow-hidden">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              {/* Background ambient radial aura */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/25 via-purple-950/15 to-transparent pointer-events-none" />

              {/* Concentric radar lines and subtle guide rays */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[88%] aspect-square rounded-full border border-cyan-500/10 border-dashed animate-[spin_90s_linear_infinite]" />
                <div className="absolute w-[68%] aspect-square rounded-full border border-cyan-500/15" />
                <div className="absolute w-[46%] aspect-square rounded-full border border-purple-500/10" />
                <div className="absolute w-[26%] aspect-square rounded-full border border-cyan-500/15 border-dashed" />
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
                <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
              </div>

              {/* Top map status overlay */}
              <div className="relative z-20 flex items-center justify-between font-mono text-[10px] text-zinc-400 border-b border-cyan-500/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">
                    {isAllView
                      ? "ENTIRE NEURAL TOPOLOGY"
                      : `${currentDomain?.title.toUpperCase()} CLUSTER`}
                  </span>
                </div>
                <div className="text-zinc-500 hidden sm:block">
                  COORDINATES: DYNAMIC FLOATING VECTOR FIELD
                </div>
              </div>

              {/* CENTER CONSTELLATION CANVAS */}
              <div className="relative flex-1 w-full h-full min-h-[500px] flex items-center justify-center my-2">
                {/* SVG Connecting Synapse Beams */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter
                      id="synapseGlow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur stdDeviation="0.8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Filtered mode: radial lines from center (50,50) to orbital nodes */}
                  {!isAllView &&
                    displayedNodes.map((node) => {
                      const theme =
                        DOMAIN_THEMES[node.domainKey] || DOMAIN_THEMES.frontend;
                      const isSelected = activeSkill === node.skill;
                      return (
                        <g key={node.skill}>
                          <line
                            x1="50"
                            y1="50"
                            x2={node.x}
                            y2={node.y}
                            stroke={theme.line}
                            strokeWidth={isSelected ? "0.8" : "0.4"}
                            strokeDasharray={isSelected ? "none" : "1.5 1"}
                            opacity={isSelected ? "0.9" : "0.4"}
                            filter="url(#synapseGlow)"
                          />
                          <circle
                            cx={50 + (node.x - 50) * 0.5}
                            cy={50 + (node.y - 50) * 0.5}
                            r={isSelected ? "1" : "0.6"}
                            fill={theme.line}
                            className="animate-ping"
                          />
                        </g>
                      );
                    })}

                  {/* All mode: Intra-cluster connecting lines between neighboring nodes */}
                  {isAllView &&
                    displayedNodes.map((node, i) => {
                      // Connect to next node in same domain
                      const nextInDomain = displayedNodes
                        .slice(i + 1)
                        .find((n) => n.domainKey === node.domainKey);
                      if (!nextInDomain) return null;
                      const theme =
                        DOMAIN_THEMES[node.domainKey] || DOMAIN_THEMES.frontend;
                      return (
                        <line
                          key={`line-${node.skill}-${nextInDomain.skill}`}
                          x1={node.x}
                          y1={node.y}
                          x2={nextInDomain.x}
                          y2={nextInDomain.y}
                          stroke={theme.line}
                          strokeWidth="0.35"
                          strokeDasharray="1 1"
                          opacity="0.35"
                        />
                      );
                    })}
                </svg>

                {/* Filtered view central core hub */}
                {!isAllView && currentDomain && (
                  <motion.div
                    key={`hub-${selectedFilter}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center text-center select-none"
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(0,240,255,0.4)] animate-pulse" />
                    <div className="absolute -inset-2 rounded-full border border-cyan-400/25 border-dashed animate-[spin_24s_linear_infinite]" />
                    <div className="w-full h-full rounded-full bg-[#050c18] border border-cyan-300 flex flex-col items-center justify-center p-2 shadow-[inset_0_0_20px_rgba(0,240,255,0.25)]">
                      <div className="p-1.5 rounded-full bg-cyan-500/20 text-cyan-300 mb-0.5">
                        {getDomainIcon(selectedFilter, "w-4 h-4 sm:w-5 sm:h-5")}
                      </div>
                      <span className="font-orbitron font-extrabold text-[9px] sm:text-[10px] text-white tracking-wider uppercase leading-tight">
                        {currentDomain.title}
                      </span>
                      <span className="font-mono text-[7.5px] text-cyan-400 mt-0.5 font-bold">
                        CLUSTER CORE
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* FLOATING NODES (VARIABLE SIZES & 2-LINE LABELS) */}
                <AnimatePresence>
                  {displayedNodes.map((node, idx) => {
                    const theme =
                      DOMAIN_THEMES[node.domainKey] || DOMAIN_THEMES.frontend;
                    const { line1, line2, isLarge } = getSkillDisplay(
                      node.skill,
                    );
                    const isSelected = activeSkill === node.skill;

                    // Staggered floating oscillation parameters
                    const floatY = 5 + (idx % 4) * 2;
                    const floatX = 3 + (idx % 3) * 1.5;
                    const duration = 4.2 + (idx % 5) * 0.6;
                    const delay = (idx * 0.22) % 2.2;

                    return (
                      <motion.div
                        key={node.skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          y: [0, -floatY, 0, floatY, 0],
                          x: [0, floatX, 0, -floatX, 0],
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          scale: { duration: 0.35, delay: idx * 0.02 },
                          opacity: { duration: 0.35 },
                          y: {
                            duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay,
                          },
                          x: {
                            duration: duration * 1.15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: delay * 0.7,
                          },
                        }}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        className={`absolute z-30 group cursor-pointer ${isSelected ? "z-40" : ""}`}
                        onClick={() => setActiveSkill(node.skill)}
                        onMouseEnter={() => setActiveSkill(node.skill)}
                      >
                        {/* Circular/Orb Body with Variable Sizing */}
                        <div
                          className={`rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 relative select-none ${
                            isLarge
                              ? "w-24 h-24 sm:w-28 sm:h-28 p-2"
                              : "w-16 h-16 sm:w-20 sm:h-20 p-1.5"
                          } ${
                            isSelected
                              ? `${theme.border} ${theme.bg} ${theme.glow} ring-2 ring-white/40 scale-110`
                              : `border-zinc-800/90 bg-[#060814]/90 hover:${theme.border} hover:${theme.glow} hover:scale-105`
                          }`}
                        >
                          {/* Active outer pulse ring */}
                          {isSelected && (
                            <span
                              className={`absolute -inset-1.5 rounded-full border ${theme.border} opacity-50 animate-ping`}
                              style={{ animationDuration: "2.5s" }}
                            />
                          )}

                          {/* Icon */}
                          <div
                            className={`transition-colors ${isSelected ? theme.text : "text-zinc-300 group-hover:" + theme.text}`}
                          >
                            {getSkillIcon(
                              node.skill,
                              isLarge
                                ? "w-4 h-4 sm:w-5 sm:h-5"
                                : "w-3.5 h-3.5 sm:w-4 sm:h-4",
                            )}
                          </div>

                          {/* Two-Line or Single-Line Label with full visibility */}
                          <div className="mt-1 text-center leading-tight">
                            <span
                              className={`block font-mono font-bold ${
                                isLarge
                                  ? "text-[9.5px] sm:text-[10.5px] text-zinc-100"
                                  : "text-[9.5px] sm:text-[11px] text-zinc-200"
                              } ${isSelected ? "text-white" : "group-hover:text-white"}`}
                            >
                              {line1}
                            </span>
                            {line2 && (
                              <span
                                className={`block font-mono font-bold text-[9px] sm:text-[10px] ${
                                  isSelected
                                    ? theme.text
                                    : "text-zinc-400 group-hover:" + theme.text
                                }`}
                              >
                                {line2}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* BOTTOM TELEMETRY DOCK: Displays Inspected Node Details & Connections */}
              <div className="relative z-20 pt-3 border-t border-cyan-500/20 bg-black/40 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  {/* Left node info */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 shrink-0">
                      {getSkillIcon(activeSkill, "w-4 h-4")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-orbitron font-extrabold text-sm sm:text-base text-white glow-cyan">
                          {activeSkill}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 uppercase">
                          INSPECTED NODE
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                        {activeRelation[0]?.type}:{" "}
                        <span className="text-zinc-200">
                          {activeRelation[0]?.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right tip / switch indicator */}
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>HOVER OR TAP ANY FLOATING ORB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SYSTEM CERTIFICATIONS MODULE                               */}
        {/* ========================================================= */}
        <div className="pt-4 sm:pt-6 border-t border-cyan-500/20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <span className="font-orbitron text-xs font-bold text-purple-400 tracking-widest px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/30">
                ACCREDITATION
              </span>
              <h3 className="font-orbitron text-xl sm:text-3xl font-bold tracking-tight text-white glow-violet">
                SYSTEM CERTIFICATIONS
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="hud-card rounded-2xl p-6 border border-purple-500/30 flex items-start gap-4 hover:border-purple-400/60 transition-all"
              >
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                <div className="p-3.5 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-400 shrink-0">
                  <Cloud className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                      {cert.credentialId}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      YEAR: {cert.year}
                    </span>
                  </div>

                  <h4 className="font-space font-bold text-base sm:text-lg text-white">
                    {cert.title}
                  </h4>

                  <div className="text-xs font-mono text-zinc-400">
                    ISSUER: <span className="text-zinc-300">{cert.issuer}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AUTHENTICATED ACCREDITATION</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creative pursuits and hobbies temporarily commented out. */}
        {false && (
          <div className="pt-6 sm:pt-8 border-t border-cyan-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                  HUMAN PURSUITS
                </span>
                <h3 className="font-orbitron text-xl sm:text-3xl font-bold tracking-tight text-white glow-cyan">
                  CREATIVE PURSUITS & HOBBIES
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {interests.map((hobby, hIdx) => {
                const isFlipped = flippedCardIdx === hIdx;
                return (
                  <div
                    key={hobby.name}
                    onClick={() => toggleCardFlip(hIdx)}
                    className={`flip-card-container h-[410px] cursor-pointer group select-none ${
                      isFlipped ? "is-flipped" : ""
                    }`}
                    aria-label={`${hobby.name} hobby details`}
                  >
                    <div className="flip-card-inner">
                      {/* FRONT FACE: Image only */}
                      <div className="flip-card-front border border-cyan-500/30 bg-[#06070c] shadow-2xl overflow-hidden relative">
                        <div className="hud-corner-tl" />
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="hud-corner-br" />

                        {/* Full-bleed hobby image */}
                        <div className="absolute inset-0 z-0 bg-[#06070c]">
                          <img
                            src={hobby.image}
                            alt={hobby.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>

                      {/* BACK FACE: Detailed Narrative & Cyber Telemetry */}
                      <div className="flip-card-back border border-cyan-400/50 bg-[#080b14]/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between relative">
                        <div className="hud-corner-tl" />
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="hud-corner-br" />

                        {/* Header */}
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
                                {getHobbyIcon(hobby.name, "w-4 h-4")}
                              </div>
                              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 font-bold">
                                {hobby.category}
                              </span>
                            </div>
                          </div>

                          <h4 className="font-orbitron font-bold text-xl text-white glow-cyan mb-1">
                            {hobby.name}
                          </h4>

                          <div className="text-[11px] font-mono text-cyan-400/90 mb-4">
                            {hobby.tagline}
                          </div>

                          <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/20 text-xs font-inter text-zinc-200 leading-relaxed">
                            {hobby.detail}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-cyan-500/20 space-y-2.5">
                          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              ACTIVE PURSUIT
                            </span>
                            <span>HUMAN CORE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
