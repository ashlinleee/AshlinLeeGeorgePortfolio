import React, { useEffect, useRef, useState } from "react";
import { Bot, Send, User, X } from "lucide-react";
import { ashlinProfile } from "../data/ashlinProfile";

/* =========================================================
   QUICK PROMPTS
========================================================= */

const QUICK_PROMPTS = [
  "ABOUT ASHLIN",
  "HAL EXPERIENCE",
  "PROJECTS",
  "TECH STACK",
  "EDUCATION",
  "CONTACT",
];

/* =========================================================
   FALLBACK RESPONSES
========================================================= */

const OUT_OF_SCOPE =
  "I don’t have that information in Ashlin’s portfolio, so I can’t answer it reliably. I can help with her documented experience, projects, skills, education, certifications, leadership, languages, interests, or contact details.";

const EMPTY_QUERY =
  "Ask me something about Ashlin's portfolio — for example, her projects, internships, technical skills, education, or experience at HAL.";

const GREETINGS = [
  "Hi! I’m Ashlin’s portfolio assistant. What would you like to know about her?",
  "Hello! I can help you explore Ashlin’s portfolio. Ask me about her projects, experience, skills, education, or anything documented in her portfolio.",
  "Hey! I’m here to help you learn more about Ashlin. What would you like to know?",
];

const THANK_YOU_RESPONSES = [
  "You're welcome! Let me know if you'd like to explore another part of Ashlin's portfolio.",
  "You're welcome! Feel free to ask me anything else about Ashlin's documented experience.",
];

const GOODBYE_RESPONSES = [
  "Thanks for visiting Ashlin's portfolio. Have a great day!",
  "It was nice chatting with you. Feel free to come back if you'd like to explore Ashlin's portfolio further.",
];

/* =========================================================
   BASIC TEXT HELPERS
========================================================= */

const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^\w\s+#./-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const containsAny = (text, terms) => terms.some((term) => text.includes(term));

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const hasQuestionWord = (text, words) =>
  words.some((word) => text.includes(word));

/*
 * Gives a score based on how many terms from a group
 * appear in the user's question.
 */
const scoreTerms = (text, terms) =>
  terms.reduce((score, term) => {
    if (text.includes(term)) {
      return score + (term.includes(" ") ? 2 : 1);
    }

    return score;
  }, 0);

/* =========================================================
   PORTFOLIO DESCRIPTORS
========================================================= */

function describeExperience(item, mode = "full") {
  if (!item) return OUT_OF_SCOPE;

  const metric = item.metrics ? ` Reported outcome: ${item.metrics}.` : "";

  if (mode === "company") {
    return `${item.role} at ${item.company}, ${item.location} (${item.period}).`;
  }

  if (mode === "technologies") {
    return `${item.company} experience involved ${item.technologies.join(
      ", ",
    )}.`;
  }

  if (mode === "highlights") {
    return `${item.highlights.join(" ")}${metric}`;
  }

  return `${item.role} at ${item.company}, ${item.location} (${item.period}). ${item.highlights.join(
    " ",
  )} Technologies: ${item.technologies.join(", ")}.${metric}`;
}

function describeProject(project, mode = "full") {
  if (!project) return OUT_OF_SCOPE;

  const link = project.link ? ` Live site: ${project.link}.` : "";

  if (mode === "technologies") {
    return `${project.title} was built using ${project.technologies.join(
      ", ",
    )}.`;
  }

  if (mode === "description") {
    return `${project.title}: ${project.description}`;
  }

  if (mode === "category") {
    return `${project.title} is categorized as a ${project.category.toLowerCase()} project.`;
  }

  return `${project.title} is an ${project.category.toLowerCase()} project. ${
    project.description
  } Stack: ${project.technologies.join(", ")}. Reported metric: ${
    project.metrics
  }.${link}`;
}

/* =========================================================
   ENTITY DETECTION
========================================================= */

function findProject(query, projects) {
  if (!projects?.length) return null;

  const q = normalizeText(query);

  /*
   * First try the actual project title.
   */
  const directMatch = projects.find((project) => {
    const title = normalizeText(project.title);

    return (
      q.includes(title) ||
      title
        .split(" ")
        .filter((word) => word.length > 3)
        .some((word) => q.includes(word))
    );
  });

  if (directMatch) return directMatch;

  /*
   * Project-specific semantic terms.
   */
  const projectAliases = [
    {
      terms: [
        "brain tumour",
        "brain tumor",
        "mri",
        "medical imaging",
        "medical image",
        "resnet",
        "densenet",
        "vgg",
        "tumor",
        "tumour",
      ],
      index: 0,
    },
    {
      terms: [
        "down under",
        "downunder",
        "travel platform",
        "travel website",
        "australia platform",
      ],
      index: 1,
    },
    {
      terms: ["micekart", "mice kart", "event management", "event platform"],
      index: 2,
    },
  ];

  for (const alias of projectAliases) {
    if (containsAny(q, alias.terms) && projects[alias.index]) {
      return projects[alias.index];
    }
  }

  return null;
}

function findExperience(query, experience) {
  if (!experience?.length) return null;

  const q = normalizeText(query);

  /*
   * Direct company/entity recognition.
   */
  const directMatch = experience.find((item) => {
    const company = normalizeText(item.company);

    return (
      q.includes(company) ||
      company
        .split(" ")
        .filter((word) => word.length > 3)
        .some((word) => q.includes(word))
    );
  });

  if (directMatch) return directMatch;

  /*
   * Semantic experience detection.
   */
  const experienceAliases = [
    {
      terms: [
        "hal",
        "hindustan aeronautics",
        "aerospace",
        "aircraft",
        "trainer aircraft",
        "avionics",
        "flight worthy",
        "flight-worthy",
        "wpf",
        "mission computer",
        "arinc",
      ],
      index: 0,
    },
    {
      terms: [
        "inventuriz",
        "stock prediction",
        "stock forecasting",
        "financial forecasting",
        "deep learning research",
        "financial model",
      ],
      index: 1,
    },
    {
      terms: [
        "letsupgrade",
        "data management",
        "data accuracy",
        "academic portal",
        "data redundancy",
      ],
      index: 2,
    },
  ];

  for (const alias of experienceAliases) {
    if (containsAny(q, alias.terms) && experience[alias.index]) {
      return experience[alias.index];
    }
  }

  return null;
}

function findSkill(query, skillRelations, skills) {
  const q = normalizeText(query);

  /*
   * First search skillRelations.
   */
  if (skillRelations) {
    const matchedRelation = Object.keys(skillRelations).find((skill) => {
      const normalizedSkill = normalizeText(skill);

      return (
        q.includes(normalizedSkill) ||
        normalizedSkill
          .split(" ")
          .filter((word) => word.length > 2)
          .some((word) => q.includes(word))
      );
    });

    if (matchedRelation) {
      return {
        name: matchedRelation,
        relation: skillRelations[matchedRelation],
      };
    }
  }

  /*
   * Then search actual skill categories/items.
   */
  if (skills) {
    for (const domain of Object.values(skills)) {
      const matchedItem = domain.items?.find((skill) => {
        const normalizedSkill = normalizeText(skill);

        return (
          q.includes(normalizedSkill) ||
          normalizedSkill
            .split(" ")
            .filter((word) => word.length > 2)
            .some((word) => q.includes(word))
        );
      });

      if (matchedItem) {
        return {
          name: matchedItem,
          domain: domain.title,
        };
      }
    }
  }

  return null;
}

/* =========================================================
   INTENT DETECTION
========================================================= */

function detectIntent(query) {
  const q = normalizeText(query);

  const intents = {
    greeting: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "hiya",
    ],

    thanks: ["thank you", "thanks", "thank", "appreciate it", "that helps"],

    goodbye: ["bye", "goodbye", "see you", "talk later", "have a good day"],

    contact: [
      "contact",
      "email",
      "phone",
      "number",
      "linkedin",
      "github",
      "reach her",
      "reach ashlin",
      "get in touch",
    ],

    education: [
      "education",
      "degree",
      "university",
      "college",
      "school",
      "cgpa",
      "gpa",
      "academic",
      "studied",
      "study",
      "qualification",
      "hsc",
      "sslc",
    ],

    certification: [
      "certification",
      "certifications",
      "certificate",
      "certified",
      "aws",
      "cloud practitioner",
      "technical essentials",
    ],

    language: [
      "language",
      "languages",
      "speak",
      "speaks",
      "fluent",
      "english",
      "hindi",
      "kannada",
      "malayalam",
    ],

    leadership: [
      "leadership",
      "leader",
      "club",
      "debate",
      "organization",
      "start me up",
      "position of responsibility",
    ],

    interests: [
      "interest",
      "interests",
      "hobby",
      "hobbies",
      "free time",
      "baking",
      "painting",
      "fashion",
      "creative",
    ],

    softSkills: [
      "soft skill",
      "soft skills",
      "strength",
      "strengths",
      "teamwork",
      "communication",
      "problem solving",
      "public speaking",
      "leadership skills",
    ],

    experience: [
      "experience",
      "work experience",
      "work history",
      "internship",
      "internships",
      "worked",
      "work",
      "job",
      "professional experience",
      "companies",
      "company",
    ],

    projects: [
      "project",
      "projects",
      "built",
      "build",
      "created",
      "portfolio project",
      "what has she made",
      "what did she make",
    ],

    skills: [
      "skill",
      "skills",
      "technical skill",
      "technical skills",
      "technology",
      "technologies",
      "tech stack",
      "stack",
      "programming",
      "programming language",
      "framework",
      "database",
      "tools",
    ],

    about: [
      "who is ashlin",
      "who is she",
      "about ashlin",
      "about her",
      "tell me about ashlin",
      "background",
      "profile",
      "what does she do",
      "what can she do",
      "what is she good at",
      "value proposition",
      "usp",
    ],

    resume: [
      "resume",
      "cv",
      "curriculum vitae",
      "download resume",
      "download cv",
    ],

    socialImpact: [
      "volunteer",
      "volunteering",
      "ngo",
      "social impact",
      "bhumi",
      "community",
    ],
  };

  let bestIntent = null;
  let bestScore = 0;

  Object.entries(intents).forEach(([intent, terms]) => {
    const score = scoreTerms(q, terms);

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  });

  return {
    intent: bestIntent,
    score: bestScore,
  };
}

/* =========================================================
   FOLLOW-UP / CONTEXT DETECTION
========================================================= */

function isFollowUpQuestion(query) {
  const q = normalizeText(query);

  return containsAny(q, [
    "tell me more",
    "more about that",
    "more about it",
    "what about that",
    "what about it",
    "what did she do there",
    "what did she do",
    "what did she work on there",
    "what technologies did she use there",
    "what tech did she use there",
    "which technologies",
    "which tech",
    "what was her role",
    "what was she responsible for",
    "what was the project",
    "explain that",
    "explain it",
    "can you explain",
    "how so",
    "why",
    "and what else",
    "what else",
    "where was that",
    "when was that",
    "who was that",
    "that project",
    "that experience",
    "there",
    "it",
    "this project",
    "this experience",
  ]);
}

function inferFollowUpMode(query) {
  const q = normalizeText(query);

  if (
    containsAny(q, [
      "technology",
      "technologies",
      "tech",
      "stack",
      "tools",
      "used",
    ])
  ) {
    return "technologies";
  }

  if (
    containsAny(q, [
      "role",
      "responsible",
      "responsibilities",
      "work on",
      "worked on",
      "did she do",
    ])
  ) {
    return "highlights";
  }

  if (
    containsAny(q, [
      "what is it",
      "what was the project",
      "explain",
      "tell me more",
      "more about",
    ])
  ) {
    return "full";
  }

  return "full";
}

/* =========================================================
   NATURAL RESPONSE BUILDERS
========================================================= */

function answerAbout(query) {
  const { identity } = ashlinProfile;

  return `${identity.name} focuses on ${identity.specializations.join(
    ", ",
  )}. ${identity.valueProposition} Her documented capabilities include ${identity.capabilities
    .map((capability) => `${capability.title} — ${capability.detail}`)
    .join("; ")}.`;
}

function answerProjects(query) {
  const { projects } = ashlinProfile;

  return `Ashlin's documented projects include ${projects
    .map((project) => `${project.title} (${project.category})`)
    .join(
      "; ",
    )}. You can ask me about any specific project and I can explain its purpose, technologies, and documented results.`;
}

function answerExperience() {
  const { experience } = ashlinProfile;

  return `Ashlin's documented professional experiences include ${experience
    .map((item) => `${item.role} at ${item.company} (${item.period})`)
    .join(
      "; ",
    )}. You can ask me about a specific company or type of work for more detail.`;
}

function answerSkills() {
  const { skills } = ashlinProfile;

  return (
    Object.values(skills)
      .map((domain) => `${domain.title}: ${domain.items.join(", ")}`)
      .join(". ") + "."
  );
}

function answerEducation() {
  const { education } = ashlinProfile;

  return (
    education
      .map(
        (item) =>
          `${item.degree} at ${item.institution} (${item.period}): ${item.score}${
            item.scoreDetail ? `, ${item.scoreDetail}` : ""
          }`,
      )
      .join("; ") + "."
  );
}

function answerCertifications() {
  const { certifications } = ashlinProfile;

  return `Ashlin's documented certifications are ${certifications
    .map(
      (certification) =>
        `${certification.title} from ${certification.issuer} (${certification.year})`,
    )
    .join("; ")}.`;
}

function answerLanguages() {
  const { languages } = ashlinProfile;

  return `Ashlin's documented languages are ${languages
    .map((language) => `${language.name} (${language.level})`)
    .join(", ")}.`;
}

function answerLeadership() {
  const { leadership } = ashlinProfile;

  return leadership
    .map(
      (role) =>
        `${role.role}, ${role.organization}: ${role.highlights.join(" ")}`,
    )
    .join(" ");
}

function answerInterests() {
  const { interests } = ashlinProfile;

  return `Ashlin's documented interests include ${interests
    .map((interest) => interest.name)
    .join(", ")}.`;
}

function answerSoftSkills() {
  const { softSkills } = ashlinProfile;

  return `Ashlin's documented strengths include ${softSkills
    .map((skill) => `${skill.title} — ${skill.description}`)
    .join("; ")}.`;
}

function answerContact() {
  const { contact } = ashlinProfile;

  return `You can contact Ashlin at ${contact.email}, ${contact.phone}, LinkedIn: ${contact.linkedin}, or GitHub: ${contact.github}.`;
}

function answerSocialImpact() {
  const { identity, socialImpact } = ashlinProfile;

  return `${identity.name} volunteered with ${socialImpact.organization} (${socialImpact.period}). ${socialImpact.highlights.join(
    " ",
  )} Focus areas: ${socialImpact.technologies.join(", ")}.`;
}

/* =========================================================
   MAIN LOCAL CONVERSATIONAL ENGINE
========================================================= */

function getReply(query, previousContext = null) {
  const q = normalizeText(query);

  if (!q) {
    return {
      text: EMPTY_QUERY,
      context: previousContext,
    };
  }

  const { identity, experience, projects, skillRelations, skills } =
    ashlinProfile;

  /* -------------------------------------------------------
     Greetings / social conversation
  ------------------------------------------------------- */

  if (
    containsAny(q, [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "hiya",
    ])
  ) {
    return {
      text: randomItem(GREETINGS),
      context: {
        type: "general",
      },
    };
  }

  if (
    containsAny(q, [
      "thank you",
      "thanks",
      "thank",
      "appreciate it",
      "that helps",
    ])
  ) {
    return {
      text: randomItem(THANK_YOU_RESPONSES),
      context: previousContext,
    };
  }

  if (containsAny(q, ["bye", "goodbye", "see you", "talk later"])) {
    return {
      text: randomItem(GOODBYE_RESPONSES),
      context: previousContext,
    };
  }

  /* -------------------------------------------------------
     Detect entities first.
     This lets:
       "Tell me about aerospace projects"
       "What did she do at HAL?"
       "What technologies did she use for MRI?"
     work even when the broad intent is ambiguous.
  ------------------------------------------------------- */

  const matchedProject = findProject(q, projects);
  const matchedExperience = findExperience(q, experience);
  const matchedSkill = findSkill(q, skillRelations, skills);

  /* -------------------------------------------------------
     FOLLOW-UP QUESTIONS
  ------------------------------------------------------- */

  if (previousContext && isFollowUpQuestion(q)) {
    const mode = inferFollowUpMode(q);

    if (
      previousContext.type === "project" &&
      previousContext.index !== undefined &&
      projects[previousContext.index]
    ) {
      const project = projects[previousContext.index];

      if (mode === "technologies") {
        return {
          text: describeProject(project, "technologies"),
          context: previousContext,
        };
      }

      if (mode === "description") {
        return {
          text: describeProject(project, "description"),
          context: previousContext,
        };
      }

      return {
        text: describeProject(project),
        context: previousContext,
      };
    }

    if (
      previousContext.type === "experience" &&
      previousContext.index !== undefined &&
      experience[previousContext.index]
    ) {
      const item = experience[previousContext.index];

      if (mode === "technologies") {
        return {
          text: describeExperience(item, "technologies"),
          context: previousContext,
        };
      }

      if (mode === "highlights") {
        return {
          text: describeExperience(item, "highlights"),
          context: previousContext,
        };
      }

      return {
        text: describeExperience(item),
        context: previousContext,
      };
    }

    if (previousContext.type === "skill" && previousContext.name) {
      const relation = skillRelations?.[previousContext.name];

      if (relation) {
        return {
          text: `${previousContext.name} appears in Ashlin's portfolio through ${relation
            .map((item) => `${item.type}: ${item.label}`)
            .join("; ")}.`,
          context: previousContext,
        };
      }
    }
  }

  /* -------------------------------------------------------
     SPECIFIC PROJECT
  ------------------------------------------------------- */

  if (matchedProject) {
    const index = projects.indexOf(matchedProject);

    if (
      containsAny(q, [
        "technology",
        "technologies",
        "tech stack",
        "stack",
        "tools",
        "framework",
        "built with",
        "used",
      ])
    ) {
      return {
        text: describeProject(matchedProject, "technologies"),
        context: {
          type: "project",
          index,
          name: matchedProject.title,
        },
      };
    }

    if (
      containsAny(q, [
        "what is",
        "what was",
        "explain",
        "about",
        "tell me",
        "purpose",
        "description",
        "what does",
      ])
    ) {
      return {
        text: describeProject(matchedProject),
        context: {
          type: "project",
          index,
          name: matchedProject.title,
        },
      };
    }

    return {
      text: describeProject(matchedProject),
      context: {
        type: "project",
        index,
        name: matchedProject.title,
      },
    };
  }

  /* -------------------------------------------------------
     SPECIFIC EXPERIENCE
  ------------------------------------------------------- */

  if (matchedExperience) {
    const index = experience.indexOf(matchedExperience);

    if (
      containsAny(q, [
        "technology",
        "technologies",
        "tech stack",
        "stack",
        "tools",
        "framework",
        "used",
      ])
    ) {
      return {
        text: describeExperience(matchedExperience, "technologies"),
        context: {
          type: "experience",
          index,
          name: matchedExperience.company,
        },
      };
    }

    if (
      containsAny(q, [
        "role",
        "responsibility",
        "responsibilities",
        "what did she do",
        "what did she work on",
        "work",
        "worked",
      ])
    ) {
      return {
        text: describeExperience(matchedExperience, "highlights"),
        context: {
          type: "experience",
          index,
          name: matchedExperience.company,
        },
      };
    }

    return {
      text: describeExperience(matchedExperience),
      context: {
        type: "experience",
        index,
        name: matchedExperience.company,
      },
    };
  }

  /* -------------------------------------------------------
     SPECIFIC SKILL
  ------------------------------------------------------- */

  if (matchedSkill) {
    if (matchedSkill.relation) {
      return {
        text: `${matchedSkill.name} appears in Ashlin's portfolio through ${matchedSkill.relation
          .map((relation) => `${relation.type}: ${relation.label}`)
          .join("; ")}.`,
        context: {
          type: "skill",
          name: matchedSkill.name,
        },
      };
    }

    if (matchedSkill.domain) {
      return {
        text: `${matchedSkill.name} is listed under Ashlin's ${matchedSkill.domain} skills.`,
        context: {
          type: "skill",
          name: matchedSkill.name,
        },
      };
    }
  }

  /* -------------------------------------------------------
     INTENT
  ------------------------------------------------------- */

  const { intent, score } = detectIntent(q);

  if (intent === "contact") {
    return {
      text: answerContact(),
      context: { type: "contact" },
    };
  }

  if (intent === "education") {
    return {
      text: answerEducation(),
      context: { type: "education" },
    };
  }

  if (intent === "certification") {
    return {
      text: answerCertifications(),
      context: { type: "certification" },
    };
  }

  if (intent === "language") {
    return {
      text: answerLanguages(),
      context: { type: "language" },
    };
  }

  if (intent === "leadership") {
    return {
      text: answerLeadership(),
      context: { type: "leadership" },
    };
  }

  if (intent === "interests") {
    return {
      text: answerInterests(),
      context: { type: "interests" },
    };
  }

  if (intent === "softSkills") {
    return {
      text: answerSoftSkills(),
      context: { type: "softSkills" },
    };
  }

  if (intent === "socialImpact") {
    return {
      text: answerSocialImpact(),
      context: { type: "socialImpact" },
    };
  }

  if (intent === "resume") {
    return {
      text: "Use the RESUME button in the navigation to download Ashlin’s CV.",
      context: { type: "resume" },
    };
  }

  if (intent === "about") {
    return {
      text: answerAbout(q),
      context: { type: "about" },
    };
  }

  if (intent === "projects") {
    return {
      text: answerProjects(q),
      context: { type: "projects" },
    };
  }

  if (intent === "experience") {
    return {
      text: answerExperience(),
      context: { type: "experience-list" },
    };
  }

  if (intent === "skills") {
    return {
      text: answerSkills(),
      context: { type: "skills" },
    };
  }

  /*
   * If there was some weak intent signal, provide a useful
   * clarification instead of immediately saying "out of scope".
   */
  if (score > 0) {
    return {
      text: `I can help with that if you make the question a little more specific. You can ask about Ashlin's ${intent}, a particular project, internship, technology, education, or experience.`,
      context: previousContext,
    };
  }

  /* -------------------------------------------------------
     Additional semantic questions
  ------------------------------------------------------- */

  if (
    containsAny(q, [
      "ai",
      "machine learning",
      "ml",
      "deep learning",
      "artificial intelligence",
    ])
  ) {
    const aiProjects = projects.filter((project) =>
      normalizeText(
        `${project.title} ${project.category} ${project.description} ${project.technologies.join(
          " ",
        )}`,
      ).match(
        /ai|machine learning|deep learning|cnn|tensorflow|pytorch|resnet|densenet|lstm/,
      ),
    );

    const aiExperience = experience.filter((item) =>
      normalizeText(
        `${item.role} ${item.company} ${item.highlights.join(
          " ",
        )} ${item.technologies.join(" ")}`,
      ).match(
        /ai|machine learning|deep learning|tensorflow|lstm|forecast|research/,
      ),
    );

    const parts = [];

    if (aiProjects.length) {
      parts.push(
        `Her portfolio documents AI/ML-related project work including ${aiProjects
          .map((project) => project.title)
          .join(", ")}.`,
      );
    }

    if (aiExperience.length) {
      parts.push(
        `Her experience also includes ${aiExperience
          .map((item) => `${item.role} at ${item.company}`)
          .join(", ")}.`,
      );
    }

    if (parts.length) {
      return {
        text: parts.join(" "),
        context: { type: "ai" },
      };
    }
  }

  /* -------------------------------------------------------
     Final fallback
  ------------------------------------------------------- */

  return {
    text: OUT_OF_SCOPE,
    context: previousContext,
  };
}

/* =========================================================
   CHATBOT COMPONENT
========================================================= */

export default function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: "intro",
      role: "assistant",
      text: "Hi, I’m Ashlin’s portfolio assistant. I can answer questions about her documented experience, projects, skills, education, certifications, leadership, interests, and contact details. Ask me naturally — you don't need to use specific keywords.",
    },
  ]);

  const [input, setInput] = useState("");

  /*
   * Stores the subject of the previous answer.
   *
   * Example:
   *
   * User: Tell me about HAL
   * Context: { type: "experience", index: 0 }
   *
   * User: What technologies did she use there?
   * The chatbot knows "there" = HAL.
   */
  const [conversationContext, setConversationContext] = useState(null);

  const messagesRef = useRef(null);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    const container = messagesRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = (message) => {
    const text = (message || input).trim();

    if (!text) return;

    const reply = getReply(text, conversationContext);

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text,
      },
      {
        id: `assistant-${Date.now() + 1}`,
        role: "assistant",
        text: reply.text,
      },
    ]);

    setConversationContext(reply.context);

    setInput("");
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* =================================================
          CHAT WINDOW
      ================================================= */}

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
          {/* HEADER */}

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

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div
            ref={messagesRef}
            className="
              flex-1
              min-h-0
              overflow-y-auto
              py-3
              space-y-3
              font-mono
              text-xs
              pr-1
            "
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
                  {/* BOT ICON */}

                  {!isUser && (
                    <span
                      className="
                      p-1
                      rounded
                      bg-purple-950/40
                      border border-purple-500/30
                      text-purple-400
                      shrink-0
                      mt-0.5
                    "
                    >
                      <Bot className="w-3 h-3" />
                    </span>
                  )}

                  {/* MESSAGE */}

                  <p
                    className={`
                      p-3
                      rounded-xl
                      border
                      text-[11px]
                      leading-relaxed
                      max-w-[85%]
                      ${
                        isUser
                          ? "bg-cyan-950/40 border-cyan-500/30 text-cyan-100 rounded-br-none"
                          : "bg-zinc-900/80 border-purple-500/25 text-zinc-200 rounded-bl-none"
                      }
                    `}
                  >
                    {message.text}
                  </p>

                  {/* USER ICON */}

                  {isUser && (
                    <span
                      className="
                      p-1
                      rounded
                      bg-cyan-950/40
                      border border-cyan-500/30
                      text-cyan-400
                      shrink-0
                      mt-0.5
                    "
                    >
                      <User className="w-3 h-3" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* =================================================
              QUICK PROMPTS
          ================================================= */}

          <div
            className="
            py-2
            border-t border-purple-500/15
            overflow-x-auto
            flex items-center
            gap-1.5
            no-scrollbar
            shrink-0
          "
          >
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() =>
                  sendMessage(`Tell me about ${prompt.toLowerCase()}`)
                }
                className="
                  whitespace-nowrap
                  px-2.5
                  py-1
                  rounded
                  bg-zinc-900/70
                  hover:bg-purple-950/50
                  border border-zinc-800
                  hover:border-purple-400/60
                  text-[10px]
                  font-mono
                  text-zinc-300
                  hover:text-purple-200
                  transition-all
                "
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* =================================================
              INPUT
          ================================================= */}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="
              pt-2
              flex items-center
              gap-2
              border-t
              border-purple-500/20
              shrink-0
            "
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Ashlin..."
              className="
                flex-1
                bg-black/40
                border border-zinc-800
                rounded-lg
                px-3 py-2
                text-xs
                text-white
                placeholder-zinc-600
                focus:outline-none
                focus:border-purple-400
              "
            />

            <button
              type="submit"
              className="
                p-2
                rounded-lg
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

      {/* =====================================================
          FLOATING BUTTON
      ===================================================== */}

      <button
        onClick={onToggle}
        className="
          flex items-center
          gap-2.5
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
