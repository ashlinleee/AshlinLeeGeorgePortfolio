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
    location: "Kharghar, Navi Mumbai, India",
    summary: "Computer Science Engineering student with experience in AI/ML research and exposure to aerospace software development. Skilled in modern web technologies, backend systems, RESTful APIs and data-driven solutions. Strong problem-solving and analytical abilities with a growing interest in AI-driven innovation.",
    valueProposition: "Bridging AI/ML research, full-stack product development, and reliable software systems to turn complex ideas into usable solutions.",
    capabilities: [
      {
        title: "AI-powered solutions",
        detail: "Builds deep-learning workflows for prediction and computer-vision use cases."
      },
      {
        title: "Full-stack products",
        detail: "Creates responsive web platforms with intuitive interfaces, APIs, and data-driven features."
      },
      {
        title: "Reliable software systems",
        detail: "Brings systems thinking to real-time workflows, data flow, and practical integration."
      }
    ]
  },
  contact: {
    email: "ashlinleegeorge@gmail.com",
    phone: "+91 63666 08726",
    location: "ITM Hostel, Sector-5, Kharghar, Navi Mumbai, 410210",
    linkedin: "https://linkedin.com/in/ashlin-lee-george/",
    github: "https://github.com/ashlinleee",
    linkedinDisplay: "linkedin.com/in/ashlin-lee-george/",
    githubDisplay: "github.com/ashlinleee"
  },
  experience: [
    {
      id: "mission-01",
      code: "MISSION 01",
      role: "Software Intern",
      company: "MCSRDC, Hindustan Aeronautics Limited (HAL)",
      location: "Bangalore",
      period: "Oct 2025 – Dec 2025",
      type: "Technical Internship",
      badge: "AEROSPACE SOFTWARE",
      environment: "Real-Time Systems & Flight-Worthy Architecture",
      highlights: [
        "Conceived the software architecture and explored modules on a Windows-based flight-worthy computer using WPF .NET platform.",
        "Gained exposure to real-time software systems, Agile development frameworks, CI/CD practices and improved data reliability through efficient sensor communication and system-level integration from testing to validation."
      ],
      technologies: ["WPF .NET", "Windows Systems", "Real-Time Software", "CI/CD", "Sensor Communication", "Agile Frameworks", "System Integration"]
    },
    {
      id: "mission-02",
      code: "MISSION 02",
      role: "AI/ML Research Associate Intern",
      company: "Inventuriz Labs Pvt. Ltd.",
      location: "Bangalore",
      period: "Jul 2025 – Sep 2025",
      type: "Technical Internship",
      badge: "AI / RESEARCH CORE",
      environment: "Deep Learning & Neural Vision Research",
      highlights: [
        "Built and optimised deep learning models for stock prediction and brain tumour detection with 90%+ accuracy.",
        "Performed data preprocessing, model training, and performance evaluation with Python and TensorFlow, achieving robust model performance.",
        "Collaborated on research documentation and result interpretation for project development readiness."
      ],
      metrics: "90%+ Accuracy in Deep Learning Models",
      technologies: ["Python", "TensorFlow", "Deep Learning", "Convolutional Neural Networks", "Data Preprocessing", "Model Optimization"]
    },
    {
      id: "mission-03",
      code: "MISSION 03",
      role: "Data Management Intern",
      company: "LetsUpgrade",
      location: "Mumbai",
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
    period: "July 2025 – July 2026",
    type: "Social Internship",
    message: "TECHNOLOGY IS POWERFUL. KNOWLEDGE IS MORE POWERFUL WHEN IT IS SHARED.",
    highlights: [
      "Trained 80+ students in Python fundamentals, boosting digital literacy and problem-solving skills.",
      "Designed and facilitated interactive sessions to improve engagement, problem-solving abilities, and learning outcomes."
    ],
    metric: "80+ Students Trained in Python",
    technologies: ["Python Mentorship", "Interactive Education", "Problem-Solving Pedagogy"]
  },
  projects: [
    {
      id: "sys-01",
      code: "SYSTEM 01",
      title: "Brain Tumour Detection using Deep Learning",
      category: "AI / COMPUTER VISION",
      technologies: ["Python", "TensorFlow", "CNN", "OpenCV"],
      metrics: "~90% Classification Accuracy",
      signals: [
        { label: "Classification accuracy", value: 90, display: "~90%" }
      ],
      description: "Developed a Convolutional Neural Network (CNN) model to classify MRI images into tumour and non-tumour categories with ~90% accuracy. Performed image preprocessing, augmentation, and model tuning to improve precision and reduce false positives.",
      pipeline: [
        { step: "01", title: "MRI Input", detail: "Raw MRI scan intake" },
        { step: "02", title: "Preprocessing", detail: "OpenCV augmentation & normalization" },
        { step: "03", title: "CNN Architecture", detail: "Deep feature extraction layers" },
        { step: "04", title: "Classification", detail: "Tumour vs Non-Tumour evaluation" },
        { step: "05", title: "Diagnosis", detail: "~90% Precision outcome" }
      ],
      isExternal: false
    },
    {
      id: "sys-02",
      code: "SYSTEM 02",
      title: "Down Under Connect",
      category: "FULL STACK TRAVEL PLATFORM",
      technologies: ["MERN Stack", "PHP", "JavaScript", "Git", "React.js"],
      metrics: "300+ User Interactions • +25% Projected Bookings",
      signals: [
        { label: "User interactions", value: 100, display: "300+" },
        { label: "Projected bookings", value: 25, display: "+25%" }
      ],
      description: "Engineered a full-stack travel platform for exploring Australian destinations, curated travel packages, itineraries, ratings, and travel experiences, generating 300+ user interactions and driving a projected 25% increase in booking conversions. Constructed a modern, responsive, SEO-optimised user interface using React.js, with interactive components, smooth animations, and intuitive navigation.",
      link: "https://downunderconnect.com.au/",
      isExternal: true
    },
    {
      id: "sys-03",
      code: "SYSTEM 03",
      title: "MICEkart",
      category: "EVENT MANAGEMENT & BUSINESS SOLUTIONS",
      technologies: ["MERN Stack", "PHP"],
      metrics: "+32% Projected Registrations • -24% Drop-Off",
      signals: [
        { label: "Projected registrations", value: 32, display: "+32%" },
        { label: "Drop-off reduction", value: 24, display: "−24%" }
      ],
      description: "Launched a fully responsive, mobile-friendly design, projecting a 32% increase in event registrations and a 24% reduction in user drop-off across devices. Implemented SEO optimisation techniques increasing organic search visibility, and driving higher website discoverability.",
      link: "https://www.micekart.com",
      isExternal: true
    }
  ],
  skills: {
    frontend: {
      title: "Frontend Development",
      items: ["HTML", "CSS", "JavaScript", "React.js"]
    },
    backend: {
      title: "Backend Development",
      items: ["Python", "SQL", "MongoDB", "Node.js", "Express.js"]
    },
    fullstack: {
      title: "Full-Stack Development",
      items: ["MERN Stack"]
    },
    cloud: {
      title: "Cloud Platforms",
      items: ["Amazon Web Services (AWS)"]
    },
    uiux: {
      title: "UI / UX Design",
      items: ["Figma"]
    },
    tools: {
      title: "Tools & Technologies",
      items: ["Git", "GitHub", "Postman"]
    }
  },
  skillRelations: {
    "Python": [
      { type: "Experience", label: "AI/ML Research at Inventuriz Labs (Deep Learning)" },
      { type: "Project", label: "Brain Tumour Detection (CNN, TensorFlow)" },
      { type: "Social", label: "Bhumi NGO (Trained 80+ Students in Python Fundamentals)" }
    ],
    "TensorFlow": [
      { type: "Experience", label: "Inventuriz Labs (Stock prediction & Brain tumour models)" },
      { type: "Project", label: "Brain Tumour Detection (~90% accuracy)" }
    ],
    "React.js": [
      { type: "Project", label: "Down Under Connect (Responsive SEO UI with Smooth Animations)" },
      { type: "Project", label: "MICEkart (Event Platform UI)" }
    ],
    "MERN Stack": [
      { type: "Project", label: "Down Under Connect (Full-stack Australian travel platform)" },
      { type: "Project", label: "MICEkart (Event registrations & mobile experience)" }
    ],
    "MongoDB": [
      { type: "Project", label: "Down Under Connect Database" },
      { type: "Project", label: "MICEkart Platform Data" }
    ],
    "Node.js": [
      { type: "Project", label: "Down Under Connect Backend Services" },
      { type: "Project", label: "MICEkart Backend Services" }
    ],
    "Express.js": [
      { type: "Project", label: "REST APIs for Down Under Connect & MICEkart" }
    ],
    "Amazon Web Services (AWS)": [
      { type: "Certification", label: "AWS Cloud Practitioner Essentials (2025)" },
      { type: "Certification", label: "AWS Technical Essentials (2025)" }
    ],
    "Git": [
      { type: "Project", label: "Version control for Down Under Connect & MICEkart" },
      { type: "Experience", label: "MCSRDC - HAL CI/CD integration" }
    ],
    "GitHub": [
      { type: "Profile", label: "github.com/ashlinleee" }
    ],
    "Postman": [
      { type: "Workflow", label: "API testing, validation & RESTful architecture verification" }
    ],
    "Figma": [
      { type: "Design", label: "UI/UX prototypes & user-flow design" }
    ],
    "WPF .NET": [
      { type: "Experience", label: "MCSRDC - Hindustan Aeronautics Limited (Flight-worthy computer)" }
    ]
  },
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "ITM Skills University, Kharghar",
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
      scoreDetail: "State Board Distinction",
      status: "COMPLETED"
    },
    {
      degree: "SSLC",
      institution: "Cluny Convent High School, Bangalore",
      period: "2010 – 2021",
      score: "Percentage: 97%",
      scoreDetail: "Excellence in Academics",
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
  detail: "Experimenting with flavors, textures, and intricate recipes to create handcrafted desserts and pastries" 
},
{ 
  name: "Painting", 
  category: "Visual Arts", 
  detail: "Expressing ideas and emotions through color, composition, and detailed hand-painted artwork" 
},
{ 
  name: "Travel & Exploration", 
  category: "Cultural Discovery", 
  detail: "Discovering diverse terrains, heritage architectures, and perspectives" 
},
{ 
  name: "Fashion & Visual Aesthetics", 
  category: "Style & Design", 
  detail: "Exploring geometric silhouettes, contemporary couture, and visual harmony" 
},
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
