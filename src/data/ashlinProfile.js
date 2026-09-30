export const ashlinProfile = {
  identity: {
    name: "Ashlin Lee George",
    discipline: "Computer Science Engineering",
    tagline: "Computer Science Engineering Student",
    specializations: ["AI/ML", "Full Stack Development", "Software Systems"],
    status: "B.Tech CSE — 2023–2027",
    cgpa: "9.08 / 10",
    cgpaNote: "Till Semester 6",
    university: "ITM Skills University",
    location: "Navi Mumbai, India",
    summary: "Computer Science Engineering student with experience in AI/ML research and exposure to aerospace software development. Skilled in modern web technologies, backend systems, RESTful APIs and data-driven solutions. Strong problem-solving and analytical abilities with a growing interest in AI-driven innovation.",
    valueProposition: "Turning intelligence into impact through combining AI/ML and full-stack engineering to transform complex problems into reliable, real-world solutions.",
    capabilities: [
      {
        title: "AI-Powered Solutions",
        detail: "Builds machine-learning and deep-learning models for prediction and computer-vision use cases."
      },
      {
        title: "Full-Stack Development",
        detail: "Creates responsive web platforms and mobile applications with intuitive interfaces, APIs, and data-driven features."
      },
      {
        title: "Reliable Software Systems",
        detail: "Brings systems thinking to real-time workflows, data flow, and practical integration."
      }
    ]
  },
  contact: {
    email: "ashlinleegeorge@gmail.com",
    phone: "+91 6366608726",
    location: "Mumbai, India",
    linkedin: "https://linkedin.com/in/ashlin-lee-george/",
    github: "https://github.com/ashlinleee",
    linkedinDisplay: "linkedin.com/in/ashlin-lee-george/",
    githubDisplay: "github.com/ashlinleee"
  },
  experience: [
    {
      id: "mission-01",
      code: "MISSION 01",
      role: "Software Engineering Intern",
      company: "MCSRDC, Hindustan Aeronautics Limited (HAL)",
      organizationDetail: "Mission & Combat Systems Research & Design Center (MCSRDC)",
      location: "Bangalore, India",
      period: "Oct 2025 – Dec 2025",
      type: "Technical Internship",
      badge: "AEROSPACE SOFTWARE",
      environment: "Real-Time Systems & Flight-Worthy Architecture",
      learningImpact: "FLIGHT-CRITICAL SOFTWARE SIMULATION & AVIONICS TESTING",
      highlights: [
        "Applied the V-Model SDLC within the aerospace and defense software environment, working with Mission Computer systems and gaining practical experience in real-time, flight-critical software development workflows.",
        "Performed testing and simulation of the Line Replaceable Units (LRUs) on the IJT aircraft platform, using PATS and Ansys SCADE to validate the functionality, cockpit logic, and symbology across HUD and MFDs.",
        "Participated in software verification of safety-critical systems, performing static and dynamic analysis, compliance checks, and test coverage evaluation to support systematic testing and validation."
      ],
      technologies: ["Ansys SCADE", "PATS", "SDLC", "CI/CD", "LDRA", "System Integration"]
    },
    {
      id: "mission-02",
      code: "MISSION 02",
      role: "AI/ML Research Associate Intern",
      company: "Inventuriz Labs Pvt. Ltd.",
      location: "Bangalore, India",
      period: "Jan 2026 – Jul 2026",
      type: "Technical Internship",
      badge: "AI / RESEARCH CORE",
      environment: "Deep Learning & Neural Vision Research",
      highlights: [
        "Built and optimised deep learning models for stock prediction and brain tumour detection with 97% accuracy.",
        "Performed EDA, model training, and performance evaluation with Python and TensorFlow, achieving robust model performance.",
        "Collaborated on research documentation and result interpretation for project development readiness."
      ],
      metrics: "97% Accuracy in Deep Learning Models",
      technologies: ["Python", "TensorFlow", "Deep Learning", "Machine Learning", "CNN", "EDA", "Model Optimization"]
    },
    {
      id: "mission-03",
      code: "MISSION 03",
      role: "Data Management Intern",
      company: "LetsUpgrade",
      location: "Mumbai, India",
      period: "Dec 2024 – Dec 2024",
      type: "Technical Internship",
      badge: "DATA ARCHITECTURE",
      environment: "Backend Restructuring & Flow Optimization",
      highlights: [
        "Improved data accuracy by 30% for a class-12 academic portal through backend restructuring.",
        "Reduced redundancy and improved data flow efficiency with optimised data architecture."
      ],
      metrics: "+30% Portal Data Accuracy",
      technologies: ["Data Architecture", "Backend Restructuring", "Data Flow Optimization", "Redundancy Reduction"]
    }
  ],
  socialImpact: {
    id: "mission-social",
    code: "HUMAN CONNECTION PROTOCOL",
    role: "Volunteer",
    organization: "Bhumi NGO",
    location: "India",
    period: "Jan 2026 – Jul 2026",
    type: "Social Internship",
    message: "TECHNOLOGY IS POWERFUL. KNOWLEDGE IS MORE POWERFUL WHEN IT IS SHARED.",
    highlights: [
      "Mentored 80+ students through online sessions in Machine Learning fundamentals, developing their problem-solving, analytical thinking, and practical technical skills through interactive learning.",
      "Conducted online sessions focused on communication, public speaking, teamwork, confidence building, and problem-solving, improving student engagement and overall learning outcomes."
    ],
    metric: "80+ Students Trained in Machine Learning",
    technologies: ["Machine Learning", "Problem-Solving Pedagogy"]
  },
  socialInternships: [
    {
      id: "mission-social-amma",
      code: "SOCIAL MISSION 02",
      role: "Volunteer",
      organization: "Amma NGO",
      location: "Bangalore, India",
      period: "Jul 2025 – Dec 2025",
      type: "Social Internship",
      highlights: [
        "Mentored 18 female students from Grades 1–7 in English, Mathematics, Kannada, and Environmental Studies through interactive and activity-based learning sessions.",
        "Conducted engaging sessions on creative arts, storytelling, speech, and communication, fostering confidence, creativity, self-expression, and active participation."
      ],
      metric: "18 Students Mentored Through Academic & Holistic Learning",
      technologies: ["Academic Mentorship", "Public Speaking", "Child-Centered Learning"]
    }
  ],
  projects: [
    {
      id: "sys-01",
      code: "PROJECT 01",
      title: "Brain Tumour Detection using Deep Learning",
      category: "DL | COMPUTER VISION",
      technologies: ["Python", "TensorFlow", "EDA", "Data Visualisation", "CNN", "OpenCV"],
      metrics: "~97% Classification Accuracy",
      signals: [
        { label: "Classification accuracy", value: 97, display: "~97%" }
      ],
      description: "Developed a Convolutional Neural Network (CNN) model to classify MRI images into tumour and non-tumour categories with ~97% accuracy. Performed image preprocessing, augmentation, and model tuning to improve precision and reduce false positives.",
      pipeline: [
        { step: "01", title: "MRI Input", detail: "Raw MRI scan intake" },
        { step: "02", title: "Preprocessing", detail: "OpenCV augmentation & normalization" },
        { step: "03", title: "CNN Architecture", detail: "Deep feature extraction layers" },
        { step: "04", title: "Classification", detail: "Tumour vs Non-Tumour evaluation" },
        { step: "05", title: "Diagnosis", detail: "~97% Precision outcome" }
      ],
      isExternal: false
    },
    {
      id: "sys-02",
      code: "PROJECT 02",
      title: "Down Under Connect",
      category: "FULL STACK TRAVEL PLATFORM",
      technologies: ["MERN Stack", "Web Hosting", "JavaScript", "GitHub", "Git", "SEO", "Research & Analytics"],
      metrics: "300+ User Interactions • +25% Projected Bookings",
      signals: [
        { label: "User interactions", value: 100, display: "300+" },
        { label: "Projected bookings", value: 25, display: "+25%" }
      ],
      description: "Designed and developed a full-stack travel platform focused on Australian destinations, enabling users to discover destinations, curated travel packages, detailed itineraries, ratings, and travel experiences through a structured exploration-to-booking journey.",
      pipeline: [
        { step: "01", title: "Discover", detail: "Destinations and packages" },
        { step: "02", title: "Explore", detail: "Responsive React interface" },
        { step: "03", title: "Plan", detail: "Itineraries and ratings" },
        { step: "04", title: "Book", detail: "Discovery-to-booking flow" },
        { step: "05", title: "Optimise", detail: "SEO and responsive design" }
      ],
      link: "https://downunderconnect.com.au/",
      isExternal: true
    },
    {
      id: "sys-03",
      code: "PROJECT 03",
      title: "MICEkart",
      category: "FULL STACK EVENT MANAGEMENT PLATFORM",
      technologies: ["MERN Stack", "PHP", "JavaScript", "SEO", "Git", "GitHub", "UX Research", "Web Hosting"],
      metrics: "+32% Projected Registrations • -24% Drop-Off",
      signals: [
        { label: "Projected registrations", value: 32, display: "+32%" },
        { label: "Drop-off reduction", value: 24, display: "−24%" }
      ],
      description: "Launched a fully responsive, mobile-friendly design, projecting a 32% increase in event registrations and a 24% reduction in user drop-off across devices. Implemented SEO optimisation techniques increasing organic search visibility, and driving higher website discoverability.",
      pipeline: [
        { step: "01", title: "Discover", detail: "Events and categories" },
        { step: "02", title: "Browse", detail: "Responsive interface" },
        { step: "03", title: "Evaluate", detail: "Event information" },
        { step: "04", title: "Register", detail: "Streamlined user flow" },
        { step: "05", title: "Optimise", detail: "SEO and UX refinement" }
      ],
      link: "https://www.micekart.com",
      isExternal: true
    }
  ],
  skills: {
    programming: {
      key: "programming",
      title: "Programming Languages",
      subline: "PYTHON • JAVASCRIPT • C++",
      description: "Core languages for building performant algorithmic solutions, robust web applications, and low-level system integrations.",
      proficiency: 94,
      badge: "CORE STACK",
      ecosystem: "CORE PROGRAMMING RUNTIME",
      items: ["Python", "JavaScript", "C++"]
    },
    databases: {
      key: "databases",
      title: "Databases",
      subline: "MONGODB • SQL",
      description: "Architecting relational schemas and document stores for data consistency, indexing, and high-throughput query optimization.",
      proficiency: 90,
      badge: "DATA PERSISTENCE",
      ecosystem: "DATA ARCHITECTURE & STORAGE",
      items: ["MongoDB", "SQL"]
    },
    testing: {
      key: "testing",
      title: "Testing & QA",
      subline: "SELENIUM • CYPRESS • JENKINS • JMETER",
      description: "End-to-end automation, continuous integration, load testing, and rigorous verification of mission-critical systems.",
      proficiency: 89,
      badge: "QUALITY ASSURANCE",
      ecosystem: "TEST AUTOMATION & CI/CD",
      items: ["Selenium", "Cypress", "Jenkins", "JMeter"]
    },
    frontend: {
      key: "frontend",
      title: "Frontend Development",
      subline: "REACT.JS • HTML • CSS",
      description: "Building responsive, high-performance user interfaces with modern web technologies and interactive experiences.",
      proficiency: 95,
      badge: "CORE SKILL",
      ecosystem: "FRONTEND DEVELOPMENT ECOSYSTEM",
      items: ["React.js", "HTML", "CSS"]
    },
    ai: {
      key: "ai",
      title: "AI & Machine Learning",
      subline: "FEATURE ENG • FEATURE SEL • EVALUATION",
      description: "Engineering predictive feature pipelines, deep learning architectures, and rigorous model evaluation metrics.",
      proficiency: 96,
      badge: "AI CORE",
      ecosystem: "MACHINE LEARNING ECOSYSTEM",
      items: ["Feature Engineering", "Feature Selection", "Model Evaluation"]
    },
    cloud: {
      key: "cloud",
      title: "Cloud & Tools",
      subline: "AWS • GITHUB • POSTMAN • HOSTING",
      description: "Cloud deployment architectures, CI/CD automation, API testing workflows, and production web hosting.",
      proficiency: 92,
      badge: "INFRASTRUCTURE",
      ecosystem: "DEVOPS & CLOUD ECOSYSTEM",
      items: ["AWS", "GitHub", "Postman", "Web Hosting"]
    },
    backend: {
      key: "backend",
      title: "Backend & APIs",
      subline: "NODE.JS • EXPRESS.JS • PHP • RESTful APIs",
      description: "Designing scalable microservices, authentication controllers, business logic, and robust RESTful API endpoints.",
      proficiency: 93,
      badge: "SERVER CORE",
      ecosystem: "BACKEND ARCHITECTURE ECOSYSTEM",
      items: ["Node.js", "Express.js", "PHP", "RESTful APIs"]
    },
    data: {
      key: "data",
      title: "Data Science",
      subline: "EDA • STATISTICAL ANALYSIS",
      description: "Extracting actionable insights from complex datasets using exploratory data analysis and statistical validation.",
      proficiency: 91,
      badge: "ANALYTICS",
      ecosystem: "DATA SCIENCE & ANALYTICS",
      items: ["Exploratory Data Analysis (EDA)", "Statistical Analysis"]
    },
    uiux: {
      key: "uiux",
      title: "UI/UX",
      subline: "FIGMA • DESIGN SYSTEMS",
      description: "Crafting wireframes, interactive user prototypes, design systems, and responsive human-computer interfaces.",
      proficiency: 90,
      badge: "CREATIVE DESIGN",
      ecosystem: "PRODUCT DESIGN & PROTOTYPING",
      items: ["Figma"]
    },
    soft: {
      key: "soft",
      title: "Professional & Soft Skills",
      subline: "COMMUNICATION • LEADERSHIP • PROBLEM SOLVING",
      description: "Articulating complex engineering concepts, leading high school and club teams, and fast paradigm learning across domains.",
      proficiency: 96,
      badge: "PROFESSIONAL",
      ecosystem: "HUMAN INTELLIGENCE & LEADERSHIP",
      items: [
        "Public Speaking & Presentation",
        "Team Collaboration & Leadership",
        "Critical Thinking & Problem Solving",
        "Adaptability & Fast Learning"
      ]
    }
  },
  skillRelations: {
    "Python": [
      { type: "Experience", label: "AI/ML Research at Inventuriz Labs (Deep Learning & Stock Models)" },
      { type: "Project", label: "Brain Tumour Detection (CNN, TensorFlow)" },
      { type: "Academic", label: "Core engineering language throughout B.Tech CSE" }
    ],
    "JavaScript": [
      { type: "Project", label: "Down Under Connect (Full-stack MERN platform)" },
      { type: "Project", label: "MICEkart (Dynamic UI & API integration)" },
      { type: "Architecture", label: "ES6+ asynchronous reactive workflows" }
    ],
    "C++": [
      { type: "Academic", label: "Data Structures, Algorithms & Object-Oriented Programming" },
      { type: "Systems", label: "High-performance memory management and algorithmic modeling" }
    ],
    "MongoDB": [
      { type: "Project", label: "Down Under Connect (Itinerary and user database)" },
      { type: "Project", label: "MICEkart (Platform schema and catalog data)" }
    ],
    "SQL": [
      { type: "Experience", label: "LetsUpgrade (Class-12 academic portal data management)" },
      { type: "Database", label: "Relational database schema modeling, queries, and optimization" }
    ],
    "Selenium": [
      { type: "Testing", label: "Automated browser testing and regression test suite execution" },
      { type: "QA", label: "Cross-browser UI functionality validation" }
    ],
    "Cypress": [
      { type: "Testing", label: "End-to-end integration testing for modern web applications" },
      { type: "QA", label: "Automated frontend user flow verification" }
    ],
    "Jenkins": [
      { type: "DevOps", label: "CI/CD continuous integration pipeline deployment" },
      { type: "Experience", label: "MCSRDC - HAL CI/CD compliance workflows" }
    ],
    "JMeter": [
      { type: "Performance", label: "Load testing and API throughput stress analysis" },
      { type: "QA", label: "Response latency benchmarking under concurrent traffic" }
    ],
    "React.js": [
      { type: "Project", label: "Down Under Connect (Responsive SEO UI with Smooth Animations)" },
      { type: "Project", label: "MICEkart (Event Platform UI)" },
      { type: "Portfolio", label: "Component-driven cybernetic OS architecture" }
    ],
    "HTML": [
      { type: "Frontend", label: "Semantic document structure, accessibility (a11y), and SEO metadata" },
      { type: "Project", label: "Web platforms Down Under Connect and MICEkart" }
    ],
    "CSS": [
      { type: "Styling", label: "Advanced Tailwind CSS, responsive layouts, HUD glassmorphism, animations" },
      { type: "Project", label: "Cross-platform mobile and desktop styling" }
    ],
    "Feature Engineering": [
      { type: "Experience", label: "Inventuriz Labs (Preprocessing raw data signals for neural prediction)" },
      { type: "Research", label: "Transforming raw inputs into high-signal feature vectors" }
    ],
    "Feature Selection": [
      { type: "Research", label: "Dimensionality reduction, correlation filtering, and collinearity elimination" },
      { type: "Model", label: "Optimizing training efficiency and preventing overfitting in ML pipelines" }
    ],
    "Model Evaluation": [
      { type: "Experience", label: "Inventuriz Labs (~97% classification accuracy validation)" },
      { type: "Metrics", label: "Confusion matrices, ROC-AUC, precision-recall, and cross-validation" }
    ],
    "AWS": [
      { type: "Certification", label: "AWS Cloud Practitioner Essentials (2025)" },
      { type: "Certification", label: "AWS Technical Essentials (2025)" }
    ],
    "GitHub": [
      { type: "Profile", label: "github.com/ashlinleee (Version control and open collaboration)" },
      { type: "Project", label: "Source repository management across all platforms" }
    ],
    "Postman": [
      { type: "Workflow", label: "API endpoint testing, contract validation & RESTful architecture verification" }
    ],
    "Web Hosting": [
      { type: "Project", label: "Down Under Connect (Live deployment on downunderconnect.com.au)" },
      { type: "Project", label: "MICEkart (Live deployment on micekart.com)" }
    ],
    "Node.js": [
      { type: "Project", label: "Down Under Connect Backend Services" },
      { type: "Project", label: "MICEkart Backend Services" }
    ],
    "Express.js": [
      { type: "Project", label: "REST APIs for Down Under Connect & MICEkart" },
      { type: "Architecture", label: "Middleware routing, JWT auth, and error handling" }
    ],
    "PHP": [
      { type: "Project", label: "MICEkart (Corporate event management backend integration)" },
      { type: "Project", label: "Down Under Connect (Server-side utilities)" }
    ],
    "RESTful APIs": [
      { type: "Project", label: "MERN Stack API contracts and microservice communication" },
      { type: "Validation", label: "Status code standardization, payload serialization, and Postman testing" }
    ],
    "Exploratory Data Analysis (EDA)": [
      { type: "Experience", label: "Inventuriz Labs (Data distribution analysis for stock & tumour datasets)" },
      { type: "Project", label: "Brain Tumour Detection (Pre-processing MRI scan sets)" }
    ],
    "Statistical Analysis": [
      { type: "Research", label: "Hypothesis testing, variance estimation, distributions, and regression" },
      { type: "Academic", label: "Applied statistical methods for computer science" }
    ],
    "Figma": [
      { type: "Design", label: "UI/UX wireframes, interactive user prototypes, and design systems" },
      { type: "Project", label: "Interface design for MICEkart and Down Under Connect" }
    ],
    "Public Speaking & Presentation": [
      { type: "Leadership", label: "Debate Team Head & podium speech leadership in tournaments" },
      { type: "Mentorship", label: "Conducted online ML mentoring sessions for 80+ students with Bhumi NGO" }
    ],
    "Team Collaboration & Leadership": [
      { type: "Leadership", label: "Core Member, Start Me Up Club (organizing workshops and startup pitches)" },
      { type: "Internship", label: "Cross-functional engineering collaboration at MCSRDC, HAL & Inventuriz" }
    ],
    "Critical Thinking & Problem Solving": [
      { type: "Research", label: "CNN model optimization and accuracy tuning to ~97% at Inventuriz Labs" },
      { type: "Systems", label: "Safety-critical avionics testing workflows under V-Model SDLC at HAL" }
    ],
    "Adaptability & Fast Learning": [
      { type: "Paradigms", label: "Rapidly transitioned from flight-worthy real-time systems to CNNs and MERN" },
      { type: "Certification", label: "Earned dual AWS certifications (Cloud Practitioner & Technical Essentials)" }
    ]
  },
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "ITM Skills University, Navi Mumbai",
      period: "2023 – 2027",
      score: "CGPA: 9.08",
      scoreDetail: "Till Semester 6",
      status: "CURRENTLY ENROLLED"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Vidya Mandir College, Bangalore",
      period: "2021 – 2023",
      score: "Percentage: 96%",
      scoreDetail: "PCMC",
      status: "COMPLETED"
    },
    {
      degree: "SSLC",
      institution: "Cluny Convent High School, Bangalore",
      period: "2010 – 2021",
      score: "Percentage: 97%",
      // scoreDetail: "Excellence in Academics",
      status: "COMPLETED"
    }
  ],
  certifications: [
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services (AWS)",
      year: "2025",
      credentialId: "AWS-CPE-2025",
      category: "Cloud Architecture"
    },
    {
      title: "AWS Technical Essentials",
      issuer: "Amazon Web Services (AWS)",
      year: "2025",
      credentialId: "AWS-TE-2025",
      category: "Cloud Computing Infrastructure"
    }
  ],
  softSkills: [
    {
      title: "Public Speaking & Presentation",
      description: "Articulating complex technical concepts, pitching business models, and high school debate podium leadership."
    },
    {
      title: "Team Collaboration & Leadership",
      description: "Coordinating multi-functional teams across student organizations, NGO initiatives, and engineering teams."
    },
    {
      title: "Critical Thinking & Problem Solving",
      description: "Algorithmic thinking, data optimization, and analytical modeling across research and engineering domains."
    },
    {
      title: "Adaptability & Fast Learning",
      description: "Rapidly mastering new paradigms from flight-worthy WPF .NET systems to CNN architectures and MERN platforms."
    }
  ],
  languages: [
    { name: "English", level: "Proficient", channel: "CH-01" },
    { name: "Hindi", level: "Conversational", channel: "CH-02" },
    { name: "Kannada", level: "Conversational", channel: "CH-03" },
    { name: "Malayalam", level: "Native", channel: "CH-04" }
  ],
  interests: [
    { 
      name: "Baking", 
      category: "Culinary Craft", 
      tagline: "Precision & Handcrafted Confections",
      detail: "Experimenting with flavors, textures, and creative recipes to craft handcrafted desserts and pastries. Each bake combines precision, presentation, and creativity to turn simple ingredients into something memorable.",
      image: "/images/hobbies/baking.png",
      accent: "rose"
    },
    { 
      name: "Painting", 
      category: "Visual Arts", 
      tagline: "Expression & Creative Harmony",
      detail: "Exploring colors, textures, and visual storytelling through expressive painting and creative experimentation. Finding new ways to translate ideas, moods, and imagination onto the canvas. Where every piece is an opportunity to experiment, observe, and create something uniquely my own.",
      image: "/images/hobbies/painting.png",
      accent: "purple"
    },
    { 
      name: "Travel & Exploration", 
      category: "Cultural Discovery", 
      tagline: "Boundless Curiosity & Discovery",
      detail: "Travelled across 25+ countries, discovering new cultures, landscapes, cuisines, and perspectives along the way. Each journey fuels curiosity, creativity, and a deeper appreciation for the stories and experiences that shape different places.",
      image: "/images/hobbies/travelling.png",
      accent: "cyan"
    },
    { 
      name: "Fashion & Visual Aesthetics", 
      category: "Style & Design", 
      tagline: "Geometric Form & Contemporary Couture",
      detail: "Exploring fashion, styling, color palettes, and visual composition to create distinctive and cohesive aesthetics. Drawn to the details that turn individual elements into a compelling visual story.",
      image: "/images/hobbies/fashion.png",
      accent: "amber"
    }
  ],
  leadership: [
    {
      role: "Core Member",
      organization: "Start Me Up Club",
      highlights: [
        "Organised workshops on business-model creation and pitch development.",
        "Drove entrepreneurial initiatives and expanded strategic network connections."
      ]
    },
    {
      role: "Head of Debate Team",
      organization: "Cluny Convent High School",
      highlights: [
        "Led competitive debate team to multiple podium finishes in inter-school tournaments.",
        "Coached team members on rhetoric, cross-examination, and rebuttal strategy."
      ]
    }
  ]
};
