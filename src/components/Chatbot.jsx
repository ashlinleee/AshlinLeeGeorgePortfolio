import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, User, X } from 'lucide-react';
import { ashlinProfile } from '../data/ashlinProfile';

const QUICK_PROMPTS = ['ABOUT ASHLIN', 'HAL EXPERIENCE', 'PROJECTS', 'TECH STACK', 'EDUCATION', 'CONTACT'];
const OUT_OF_SCOPE = "I don’t have that information in Ashlin’s portfolio, so I can’t answer it reliably. I can help with her documented experience, projects, skills, education, certifications, leadership, languages, interests, or contact details.";

const containsAny = (text, terms) => terms.some((term) => text.includes(term));

function describeExperience(item) {
  const metric = item.metrics ? ` Reported outcome: ${item.metrics}.` : '';
  return `${item.role} at ${item.company}, ${item.location} (${item.period}). ${item.highlights.join(' ')} Technologies: ${item.technologies.join(', ')}.${metric}`;
}

function describeProject(project) {
  const link = project.link ? ` Live site: ${project.link}.` : '';
  return `${project.title} is an ${project.category.toLowerCase()} project. ${project.description} Stack: ${project.technologies.join(', ')}. Reported metric: ${project.metrics}.${link}`;
}

function getReply(query) {
  const q = query.toLowerCase().trim();
  const { identity, experience, projects, socialImpact, contact, skills, skillRelations, education, certifications, softSkills, languages, interests, leadership } = ashlinProfile;

  if (!q) return OUT_OF_SCOPE;

  // Specific entities always win over broad categories, keeping answers precise.
  if (containsAny(q, ['brain tumour', 'brain tumor', 'mri', 'cnn', 'opencv'])) return describeProject(projects[0]);
  if (containsAny(q, ['down under', 'downunder', 'travel platform'])) return describeProject(projects[1]);
  if (containsAny(q, ['micekart', 'mice kart', 'event management'])) return describeProject(projects[2]);
  if (containsAny(q, ['hal', 'hindustan aeronautics', 'aerospace', 'flight-worthy', 'flight worthy', 'wpf'])) return describeExperience(experience[0]);
  if (containsAny(q, ['inventuriz', 'stock prediction', 'deep learning research'])) return describeExperience(experience[1]);
  if (containsAny(q, ['letsupgrade', 'data management', 'data accuracy', 'redundancy'])) return describeExperience(experience[2]);
  if (containsAny(q, ['bhumi', 'volunteer', 'social impact', '80+ students', '80 students'])) {
    return `${identity.name} volunteered with ${socialImpact.organization} (${socialImpact.period}). ${socialImpact.highlights.join(' ')} Focus areas: ${socialImpact.technologies.join(', ')}.`;
  }

  const matchedSkill = Object.keys(skillRelations).find((skill) => q.includes(skill.toLowerCase()));
  if (matchedSkill) {
    const connections = skillRelations[matchedSkill].map((relation) => `${relation.type}: ${relation.label}`).join('; ');
    return `${matchedSkill} appears in Ashlin’s portfolio through ${connections}.`;
  }

  if (containsAny(q, ['certification', 'certifications', 'aws', 'cloud practitioner', 'technical essentials'])) {
    return `Ashlin’s documented certifications are ${certifications.map((certification) => `${certification.title} from ${certification.issuer} (${certification.year})`).join('; ')}.`;
  }
  if (containsAny(q, ['cgpa', 'gpa', 'itm', 'university', 'academic', 'education', 'hsc', 'sslc', 'school'])) {
    return education.map((item) => `${item.degree} at ${item.institution} (${item.period}): ${item.score}${item.scoreDetail ? `, ${item.scoreDetail}` : ''}`).join('; ') + '.';
  }
  if (containsAny(q, ['language', 'english', 'hindi', 'kannada', 'malayalam'])) {
    return `Languages: ${languages.map((language) => `${language.name} (${language.level})`).join(', ')}.`;
  }
  if (containsAny(q, ['leadership', 'debate', 'start me up', 'club'])) {
    return leadership.map((role) => `${role.role}, ${role.organization}: ${role.highlights.join(' ')}`).join(' ');
  }
  if (containsAny(q, ['interest', 'hobby', 'baking', 'painting', 'fashion', 'creative'])) {
    return `Ashlin’s documented interests are ${interests.map((interest) => interest.name).join(', ')}.`;
  }
  if (containsAny(q, ['soft skill', 'strength', 'strengths', 'teamwork', 'problem solving', 'public speaking'])) {
    return `Documented strengths: ${softSkills.map((skill) => `${skill.title} — ${skill.description}`).join('; ')}.`;
  }
  if (containsAny(q, ['contact', 'email', 'phone', 'linkedin', 'github', 'reach'])) {
    return `You can contact Ashlin at ${contact.email}, ${contact.phone}, LinkedIn: ${contact.linkedin}, or GitHub: ${contact.github}.`;
  }
  if (containsAny(q, ['resume', 'cv', 'download'])) {
    return 'Use the RESUME button in the navigation to download Ashlin’s CV.';
  }
  if (containsAny(q, ['who is', 'about ashlin', 'about her', 'background', 'usp', 'value proposition', 'what can she do'])) {
    return `${identity.name} focuses on ${identity.specializations.join(', ')}. ${identity.valueProposition} She can build: ${identity.capabilities.map((capability) => `${capability.title} — ${capability.detail}`).join('; ')}.`;
  }
  if (containsAny(q, ['project', 'projects', 'portfolio', 'built', 'build'])) {
    return `Ashlin’s documented projects are ${projects.map((project) => `${project.title} (${project.category})`).join('; ')}. Ask about a project by name for its stack, scope, and reported metrics.`;
  }
  if (containsAny(q, ['experience', 'internship', 'internships', 'work history', 'work experience'])) {
    return `Ashlin’s documented internships are ${experience.map((item) => `${item.role} at ${item.company} (${item.period})`).join('; ')}. Ask about HAL, Inventuriz Labs, or LetsUpgrade for role-specific details.`;
  }
  if (containsAny(q, ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'stack', 'testing', 'qa', 'database', 'language'])) {
    return Object.values(skills).map((domain) => `${domain.title}: ${domain.items.join(', ')}`).join('. ') + '.';
  }

  return OUT_OF_SCOPE;
}

export default function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 'intro',
      role: 'assistant',
      text: "Hi, I’m Ashlin’s portfolio assistant. I answer only from the documented portfolio—ask about a role, project, skill, education, certification, leadership, language, interest, or contact detail."
    }
  ]);
  const [input, setInput] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (message) => {
    const text = (message || input).trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text },
      { id: `assistant-${Date.now()}`, role: 'assistant', text: getReply(text) }
    ]);
    setInput('');
  };

return (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
    {/* Chatbot floating window */}
    {isOpen && (
      <section
        className="
          w-[calc(100vw-1.5rem)] sm:w-[440px]
          h-[520px] max-h-[calc(100vh-7rem)]
          hud-card rounded-2xl
          p-4 sm:p-5
          border border-purple-500/50
          bg-[#07050f]/95
          backdrop-blur-xl
          shadow-violet-glow
          flex flex-col
          overflow-hidden
        "
        aria-label="Ashlin portfolio assistant"
      >
        <header className="flex items-center justify-between pb-3 border-b border-purple-500/20 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40">
              <Bot className="w-4 h-4 text-purple-300" />
            </span>

            <div>
              <h2 className="font-orbitron font-bold text-xs tracking-wider text-purple-200">
                ASHLIN AI ASSISTANT
              </h2>

              <p className="text-[10px] font-mono text-zinc-400">
                Portfolio-only answers • no speculation
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded text-zinc-400 hover:text-white transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 min-h-0 overflow-y-auto py-3 space-y-3 font-mono text-xs pr-1"
        >
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex items-start gap-2.5 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <span className="p-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-400 shrink-0 mt-0.5">
                    <Bot className="w-3 h-3" />
                  </span>
                )}

                <p
                  className={`
                    p-3 rounded-xl border text-[11px] leading-relaxed max-w-[85%]
                    ${
                      isUser
                        ? "bg-cyan-950/40 border-cyan-500/30 text-cyan-100 rounded-br-none"
                        : "bg-zinc-900/80 border-purple-500/25 text-zinc-200 rounded-bl-none"
                    }
                  `}
                >
                  {message.text}
                </p>

                {isUser && (
                  <span className="p-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick prompts */}
        <div className="py-2 border-t border-purple-500/15 overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() =>
                sendMessage(`Tell me about ${prompt.toLowerCase()}`)
              }
              className="
                whitespace-nowrap px-2.5 py-1 rounded
                bg-zinc-900/70
                hover:bg-purple-950/50
                border border-zinc-800
                hover:border-purple-400/60
                text-[10px] font-mono text-zinc-300
                hover:text-purple-200 transition-all
              "
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
          className="pt-2 flex items-center gap-2 border-t border-purple-500/20 shrink-0"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Ashlin..."
            className="
              flex-1 bg-black/40
              border border-zinc-800
              rounded-lg px-3 py-2
              text-xs text-white
              placeholder-zinc-600
              focus:outline-none focus:border-purple-400
            "
          />

          <button
            type="submit"
            className="
              p-2 rounded-lg
              bg-purple-500/20
              border border-purple-400/50
              text-purple-200
              hover:bg-purple-500/30
            "
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </section>
    )}

    {/* Floating chatbot button — ALWAYS stays visible */}
    <button
      onClick={onToggle}
      className="
        flex items-center gap-2.5
        px-4 py-3
        rounded-full
        border border-purple-400/50
        bg-[#0a0714]/95
        backdrop-blur-md
        text-purple-200
        font-mono text-xs
        tracking-wider
        shadow-violet-glow
        hover:border-purple-300
        hover:scale-105
        transition-all duration-300
      "
      aria-label={isOpen ? "Close assistant" : "Open assistant"}
    >
      {isOpen ? (
        <X className="w-4 h-4 text-purple-300" />
      ) : (
        <Bot className="w-4 h-4 text-purple-300" />
      )}

      <span className="font-orbitron font-bold">ASH</span>
    </button>
  </div>
);
}
