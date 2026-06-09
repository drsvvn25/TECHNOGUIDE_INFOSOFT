/**
 * resumeGenerator.js
 * Handles AI-powered resume content generation and ATS scoring.
 * All AI logic runs locally (no external API required) using
 * curated templates + rule-based enhancements.
 */

// ================================================================
// SAMPLE DATA – B.Tech IT Student
// ================================================================
const SAMPLE_DATA = {
  fullName: 'Arjun Sharma',
  email: 'arjun.sharma@gmail.com',
  phone: '+91 98765 43210',
  linkedin: 'linkedin.com/in/arjun-sharma-dev',
  portfolio: 'github.com/arjunsharma',
  location: 'Mumbai, Maharashtra',
  summary: '',  // Will be AI-generated
  skills: 'Python, JavaScript, React.js, Node.js, Express.js, MongoDB, SQL, Git, GitHub, REST APIs, HTML5, CSS3, Bootstrap, Tailwind CSS',
  softSkills: 'Problem Solving, Teamwork, Communication, Time Management, Leadership',
  education: [
    {
      degree: 'B.Tech – Information Technology',
      institution: 'Mumbai University',
      year: '2021 – 2025',
      grade: 'CGPA: 8.4 / 10',
      description: 'Relevant coursework: Data Structures, Algorithms, DBMS, Operating Systems, Web Technologies, Machine Learning'
    },
    {
      degree: 'HSC (Science – PCM)',
      institution: 'R.D. National College, Mumbai',
      year: '2019 – 2021',
      grade: '87.4%',
      description: ''
    }
  ],
  experience: [
    {
      title: 'Full Stack Developer Intern',
      company: 'TechNova Solutions Pvt. Ltd.',
      duration: 'June 2024 – Aug 2024',
      location: 'Mumbai, India (Hybrid)',
      bullets: [
        'Built REST APIs using Node.js + Express, reducing response time by 30%.',
        'Developed responsive React dashboards integrated with MongoDB Atlas.',
        'Collaborated in Agile sprints; used Git for version control across team of 6.'
      ]
    }
  ],
  projects: [
    {
      name: 'AI Resume Builder',
      tech: 'HTML, CSS, JavaScript',
      link: 'github.com/arjunsharma/ai-resume-builder',
      bullets: [
        'Built a client-side AI resume builder with live preview and PDF export.',
        'Implemented 3 resume templates and ATS scoring engine.',
        'Added smart content suggestions for professional summaries and skills.'
      ]
    },
    {
      name: 'E-Commerce Platform',
      tech: 'React.js, Node.js, MongoDB, Stripe',
      link: 'github.com/arjunsharma/ecommerce-app',
      bullets: [
        'Developed a full-stack e-commerce app with JWT authentication.',
        'Integrated Stripe payment gateway for secure transactions.',
        'Implemented product search, filtering, and cart functionality.'
      ]
    },
    {
      name: 'Smart Attendance System',
      tech: 'Python, OpenCV, Flask, SQLite',
      link: 'github.com/arjunsharma/smart-attendance',
      bullets: [
        'Built face recognition-based attendance system using OpenCV.',
        'Achieved 94% accuracy across 200+ student dataset.',
        'Created Flask admin dashboard for attendance analytics.'
      ]
    }
  ],
  certifications: [
    { name: 'Meta Front-End Developer Certificate', issuer: 'Coursera / Meta', year: '2024' },
    { name: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'Python for Everybody', issuer: 'University of Michigan / Coursera', year: '2023' }
  ],
  achievements: `• Won 1st place at Innovate India Hackathon 2024 (500+ teams).
• Published paper "Face Recognition in Attendance Systems" in IJCST.
• Google Developer Student Club (GDSC) – Web Dev Lead (2023-24).
• Solved 350+ problems on LeetCode (Rating: 1680).`,
  languages: 'English (Fluent), Hindi (Native), Marathi (Conversational)'
};

// ================================================================
// AI SUMMARY TEMPLATES
// ================================================================
const SUMMARY_TEMPLATES = [
  (data) => `Highly motivated B.Tech Information Technology student with hands-on experience in full-stack development using ${getTopSkills(data.skills, 4)}. Passionate about building scalable web applications and solving complex problems through clean, efficient code. Seeking opportunities to contribute to impactful software projects while continuously growing as a developer.`,

  (data) => `Results-driven software developer and final-year B.Tech IT student with proven experience in ${getTopSkills(data.skills, 3)} and modern web technologies. Demonstrated ability to deliver high-quality applications through internships and self-driven projects. Eager to leverage technical skills and creative problem-solving in a dynamic development team.`,

  (data) => `Enthusiastic Full Stack Developer with a strong foundation in ${getTopSkills(data.skills, 3)}, REST API design, and agile development. B.Tech Information Technology graduate with practical exposure to building end-to-end web applications. Committed to writing maintainable code and delivering exceptional user experiences.`
];

function getTopSkills(skillStr, count) {
  if (!skillStr) return 'modern web technologies';
  const skills = skillStr.split(',').map(s => s.trim()).filter(Boolean);
  return skills.slice(0, count).join(', ');
}

// ================================================================
// AI CONTENT ENHANCEMENT
// ================================================================

/**
 * Generate an AI professional summary based on form data.
 */
function generateAISummary(data) {
  const idx = Math.floor(Math.random() * SUMMARY_TEMPLATES.length);
  return SUMMARY_TEMPLATES[idx](data);
}

/**
 * Enhance bullet points with stronger action verbs and metrics.
 */
function enhanceBullets(bullets) {
  const actionVerbs = [
    'Architected', 'Engineered', 'Developed', 'Optimized', 'Deployed',
    'Implemented', 'Streamlined', 'Automated', 'Designed', 'Integrated',
    'Built', 'Delivered', 'Accelerated', 'Migrated', 'Refactored'
  ];
  const metrics = [
    'reducing load time by 25%', 'improving performance by 30%',
    'serving 500+ users', 'cutting API response time by 40%',
    'achieving 95%+ test coverage', 'boosting user engagement by 20%'
  ];
  return bullets.map((b, i) => {
    const verb = actionVerbs[i % actionVerbs.length];
    // Only replace if the bullet doesn't already start with a strong verb
    const firstWord = b.trim().split(' ')[0];
    const isWeak = ['created','made','did','worked','used','helped'].includes(firstWord.toLowerCase());
    if (isWeak) return `${verb} ${b.trim().slice(firstWord.length).trim()}`;
    return b;
  });
}

/**
 * Suggest ATS keywords based on skills.
 */
function getATSKeywords(skillStr) {
  const keywords = [
    'Full Stack Developer', 'Software Engineer', 'REST API', 'Agile',
    'Version Control', 'CI/CD', 'Problem Solving', 'Collaboration',
    'Open Source', 'Object-Oriented Programming', 'Data Structures',
    'Cloud Computing', 'Responsive Design', 'Unit Testing'
  ];
  const userSkills = skillStr ? skillStr.toLowerCase() : '';
  return keywords.filter(k => !userSkills.includes(k.toLowerCase())).slice(0, 6);
}

// ================================================================
// ATS SCORE ENGINE
// ================================================================

/**
 * Calculates an ATS compatibility score (0-100).
 * @param {Object} data - Collected form data
 * @returns {{ score: number, tags: Array, tips: Array }}
 */
function calculateATSScore(data) {
  let score = 0;
  const tags = [];
  const tips = [];

  // Basic fields (40 pts)
  if (data.fullName?.trim()) score += 8;
  if (data.email?.trim()) score += 8;
  if (data.phone?.trim()) score += 5;
  if (data.linkedin?.trim()) score += 5;
  if (data.portfolio?.trim()) score += 4;
  if (data.location?.trim()) score += 3;
  if (data.summary?.trim().length > 80) { score += 7; } else { tips.push('Expand your summary to 2-3 sentences.'); }

  // Skills (20 pts)
  const skillCount = data.skills ? data.skills.split(',').filter(s => s.trim()).length : 0;
  if (skillCount >= 8) { score += 20; tags.push({ label: `${skillCount} Skills ✓`, type: 'green' }); }
  else if (skillCount >= 4) { score += 12; tags.push({ label: `${skillCount} Skills`, type: 'orange' }); tips.push('Add more technical skills (target 8+).'); }
  else { score += 5; tags.push({ label: 'Add More Skills', type: 'red' }); tips.push('List at least 8 relevant technical skills.'); }

  // Experience (20 pts)
  const expCount = data.experience?.length || 0;
  if (expCount >= 1) { score += 20; tags.push({ label: 'Experience ✓', type: 'green' }); }
  else { tips.push('Add internship or work experience.'); tags.push({ label: 'No Experience', type: 'orange' }); }

  // Projects (15 pts)
  const projCount = data.projects?.length || 0;
  if (projCount >= 3) { score += 15; tags.push({ label: `${projCount} Projects ✓`, type: 'green' }); }
  else if (projCount >= 1) { score += 8; tags.push({ label: `${projCount} Project(s)`, type: 'orange' }); tips.push('Add 2-3 projects for a stronger profile.'); }
  else { tips.push('Add at least 2 projects.'); tags.push({ label: 'No Projects', type: 'red' }); }

  // Certifications (5 pts)
  const certCount = data.certifications?.length || 0;
  if (certCount >= 1) { score += 5; tags.push({ label: 'Certifications ✓', type: 'green' }); }
  else { tips.push('Add relevant certifications.'); }

  score = Math.min(100, Math.round(score));

  let label = 'Needs Improvement';
  if (score >= 85) label = '🎯 ATS Ready!';
  else if (score >= 70) label = '👍 Good Profile';
  else if (score >= 50) label = '⚠ Needs Work';

  return { score, tags, tips, label };
}

// Export for use in script.js
window.ResumeGenerator = {
  SAMPLE_DATA,
  generateAISummary,
  enhanceBullets,
  getATSKeywords,
  calculateATSScore
};
