import { Experience, Project, Hackathon, SkillCategory } from "./types";

export const profileDetails = {
  fullName: "DIVY RAKESHKUMAR SHAH",
  role: "Full Stack & AI Developer",
  tagline: "Results-driven Full Stack Developer and AI Enthusiast with 3+ internship experiences and 7+ live projects. Proficient in end-to-end MERN Stack development, REST API design, and AI/ML integration.",
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "A.D. Patel Institute of Technology (ADIT), Anand",
      cgpa: "9.02",
      period: "Expected Jun 2027",
      description: "Pursuing Bachelor of Technology in Information Technology, blending deep knowledge of systems software, OOP, design patterns, and database management with AI workflows."
    },
    {
      degree: "Diploma in Information Technology",
      institution: "Bhagubhai Mafatlal Polytechnic / BBIT, Anand",
      cgpa: "8.70",
      period: "2021 – 2024",
      description: "Acquired solid foundational expertise in object-oriented programming, logical design, and fundamental computer systems architecture."
    }
  ],
  stats: [
    { value: "7+", label: "Live Projects", color: "text-primary" },
    { value: "3+", label: "Internships", color: "text-secondary" },
    { value: "5+", label: "Hackathons", color: "text-tertiary" },
    { value: "9.02", label: "B.Tech CGPA", color: "text-emerald-400" }
  ],
  socials: {
    phone: "+91-8780608198",
    email: "drsvvn25@gmail.com",
    location: "Anand, Gujarat, India",
    linkedin: "https://linkedin.com/in/divy-r-shah-342066239",
    github: "https://github.com/drsvvn25",
    twitter: "https://twitter.com/divyshah", // preserved as fallback
    linkedinIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn0rzHXR0YZbXSbvjmoweLS4ovzsMxUDoRjkKapEJ7tu2UFHn2a9j5drp8fGwv6adcX3G_5vXU9ezncjJzYgDSaPmuNnOg1HKgKvFtEDnFIBS1yxMjUjP_yH03bqtoiK0wDiyMKR-POFuRhR1KTcawZtlEeuBBLLNQm4Aw0X802gsQmUqwhvgwfr6H3F7e3cQWjLuhkplTq4JTzTTWjaMK2eEcCeo8tRhBOKkPKafPgxb_VAA29_30FDDTGYxybH3QnMZf4f9aeac",
    githubIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW26qa6lQT4RLJCwAiNAd3iohjv_XDeXJMmy8c1TOY3DDkXotKi5AhRAtWVer01csRLc8Wp_HTng_02nAxTsWiGLPVApehSD_vSXBQZWyPEPW0sKfQyTmgP1rC_8tN48eHRtftDGwGjM6GH9pA-FW7v_WT33m2b4UIxlO4UzyCBQcVEwF70by7JPLKd3TX3IoZ0Rn_vLuQvTfaGh4CE8Zgc1RFaFqryWlu7vFYZ-C00ba-LewVtAALxN8eHjlF7tnCd8-VO5J6sQg",
    twitterIcon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsSyeGkNA9vLXZYUHuM3BhM9mTnG2hiWt_-hcJQi88DmNJZrf8cWuCjhTJ2rCsDzdtGfp3X4KUrdMtjuauOtLY0yidBuxaiCFXEZedhS-vCZ-bfWqnhMr5dBfhjjiysVHG43RnvDaIA01OEM_i23-IaHQEp6q5Fxx7_R7VJLhQbffsHOahCUoXoDh2X7MGF50RsTvl-PE4aj7c_ehWWSEnMhw06PSEvGYD1d2TWr6GKB6OX64S8X0S-1SPzVR27JAU8d2oz2s1_jg"
  }
};

export const skillsCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "Layout",
    skills: ["HTML5", "CSS3", "React.js", "Bootstrap 5", "TypeScript", "Responsive Design"]
  },
  {
    title: "Backend & Databases",
    icon: "Server",
    skills: ["Node.js", "Express.js", "Flask", "REST API Design", "JWT Auth", "MongoDB", "MySQL", "Schema Design"]
  },
  {
    title: "AI / ML & Emerging",
    icon: "Brain",
    skills: ["TensorFlow", "Keras", "OpenCV", "Deep Learning", "CNN", "NLP basics", "Blockchain basics", "IoT Protocols"]
  }
];

export const programmingLanguages = [
  { name: "Java", color: "bg-primary" },
  { name: "Python", color: "bg-secondary" },
  { name: "JavaScript", color: "bg-tertiary" },
  { name: "PHP", color: "bg-indigo-400" },
  { name: "C", color: "bg-rose-400" },
  { name: "C++", color: "bg-emerald-400" }
];

export const toolsList = ["Git", "GitHub", "VS Code", "Postman", "Power BI", "Eclipse IDE"];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Technoguide Infosoft Pvt. Ltd.",
    role: "MERN Stack with AI Intern",
    period: "May 2026 – Jun 2026",
    tagline: "Building Enterprise MERN + AI Solutions",
    description: "Engineered full-stack web applications using MongoDB, Express.js, React.js, and Node.js with RESTful API architecture and JWT-based authentication. Integrated AI-assisted development workflows; built and deployed responsive interfaces consuming third-party APIs. Participated in code reviews, debugging sessions, and CI/CD deployment pipelines.",
    periodBadgeColor: "text-secondary bg-secondary/10"
  },
  {
    id: "exp-2",
    company: "Udemy (MOOC) — Remote",
    role: "TensorFlow: Deep Learning & AI Intern",
    period: "Jul – Aug 2023",
    tagline: "Advanced Neural Modeling & Classification",
    description: "Designed and trained deep learning models using TensorFlow/Keras; applied data preprocessing, augmentation, and hyperparameter tuning to achieve optimized accuracy. Built image classification and regression models; documented model evaluation metrics including precision, recall, and F1-score.",
    periodBadgeColor: "text-primary bg-primary/10"
  },
  {
    id: "exp-3",
    company: "Webial Technology Pvt. Ltd.",
    role: "Internet of Things Intern",
    period: "Sept 2022",
    tagline: "Sensor Interfaces & MQTT Communications",
    description: "Interfaced physical sensors and microcontrollers for real-time data acquisition; implemented MQTT-based IoT communication protocols for smart device automation.",
    periodBadgeColor: "text-tertiary bg-tertiary/10"
  }
];

export const selectedWorks: Project[] = [
  {
    id: "work-1",
    title: "Freelancer Platform (SkillBridge)",
    description: "A high-performance freelancer marketplace built with MongoDB, Express.js, React.js, and Node.js. Includes role-based authentication, an interactive real-time bidding engine, custom client/freelancer dashboard workspaces, and an end-to-end secure payment flow.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXNSlQ29U7GeDllM6JOQ5pfiT86Zab_xzLTwi-EGwOsh3cIgQRtxmMxCfYof8qxVWeI7ps9SECnWEoIlM5VlU-LhHcvB6pq9BrM_-X2aNDmWMaeQWziqT2rx1JYLm3ixwSvec2audx6J_ls2isiFpbR7Oy-COjxyVjktUlP9hz-wMwAv9lSbhNQExwevmYQJp_23Nlcg_VibHO0gUSj_oFhXO0wQjCatb178Qy7gzfyCh4W7_qdhdhB4Lo32__s3bISubEfUd5Ho0",
    tags: ["React", "NodeJS", "Express", "MongoDB", "JWT Auth"],
    githubUrl: "https://github.com/drsvvn25/skillbridge",
    liveUrl: "https://skillbridge-freelancer-app.onrender.com/",
    demoType: "link"
  },
  {
    id: "work-2",
    title: "Sign Bridge AI",
    description: "AI-powered Indian Sign Language recognition system using CNN-based gesture detection models. Translates hand sign gesture input coordinates to natural text in real time, significantly boosting accessibility for hearing and speech-impaired populations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7s4U9BOTJip6VJuxdzvphhGZ-3dfSfVRxQolDDC5Qg_OrcCoFb2Cnsvt36wodkKvzOGlHaYWURXAXM4EJkcU2k7iy53oQShW-f5h-tT_-xSVf26ltFkB40z8-Ym0FBMLIeYIVZ26xfSuHahRetD5L6pFFDA69D6-pEftFgkyuU7CaSyeCnc_ocqdKUYBEYOM96lLZvuic_6VSVVIj6aHk2_CCx0y9WMH08nnWXjiUtEgJJ8sdHxGOcIwBP-fjVynGrEInBb7T27I",
    tags: ["Python", "TensorFlow", "OpenCV", "Flask"],
    githubUrl: "https://github.com/drsvvn25/signbridge",
    liveUrl: "https://github.com/drsvvn25/signbridge",
    demoType: "link"
  },
  {
    id: "work-3",
    title: "Vital Sync",
    description: "Comprehensive end-to-end healthcare dashboard and monitoring system. Visualizes real-time physiological vitals and syncs doctor-patient records instantly using a high-density, modern analytics layout.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbAi8we3IAefF_xKp4PxzAOGkN2vkBTZzNvp1b4vSSlm_HlU_En1KP0qPkF1o9lQm926gejnyM1XilWFgoaFl9btFoLoWoXRJQ5Pj7VSJprKPp0kj55pKd1SvbZKLL-zbflun9t71cQCz7IQ28EtVFWDMhMMObwWgRfIk3p0rzVBia_sdtI3l85vIy3eBJhzoCPF7QgqmiEhLvBP2lBobBR8F6TGGjOUhQKmMmsnBRbWF2pdWt1pmfFI4rM51Rd-ndgp08hjJihrA",
    tags: ["MERN Stack", "React", "NodeJS", "Chart.js"],
    githubUrl: "https://github.com/drsvvn25/vitalsync",
    liveUrl: "https://vitalsync-new.onrender.com/",
    demoType: "link"
  },
  {
    id: "work-4",
    title: "GovTrackChain",
    description: "Blockchain-powered tracking solution for public government funds and procurement resources, establishing highly transparent audit trails and immutable decentralized ledger tracking.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUYNac-8xv2IjPst3VnTdb04dXTopTB_G3HPgasXK4MSbxl9B7N7dhICs93-mLmeJVhwSsaiHp7EL7ljVH5JZSXzv0HF776La8nWoiOmmkhu8efmJKmB6KfNhCDQ2hKb23psxDb4Dq3O6UOdBQFSh48PYlNp8ZKkqspYbGWc2o98WBjKdKGyYcro7Z5FZaiVA3aTyXyKf6jCRz-66fp0tlSz07tKFIRp8P9srlE5e3Ux_FBI_xDw2oqpxoyALsOwVv0EUGNeBR0C8",
    tags: ["Blockchain", "Solidity", "Smart Contracts", "Ether.js"],
    githubUrl: "https://github.com/drsvvn25/govtrackchain",
    liveUrl: "https://github.com/drsvvn25/govtrackchain",
    demoType: "visibility"
  },
  {
    id: "work-5",
    title: "Hospital Management System",
    description: "Robust patient management database system written in pure Java. Employs advanced object-oriented programming (OOP) principles, multi-threading, custom exception handling architectures, and transactional logic safety.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXNSlQ29U7GeDllM6JOQ5pfiT86Zab_xzLTwi-EGwOsh3cIgQRtxmMxCfYof8qxVWeI7ps9SECnWEoIlM5VlU-LhHcvB6pq9BrM_-X2aNDmWMaeQWziqT2rx1JYLm3ixwSvec2audx6J_ls2isiFpbR7Oy-COjxyVjktUlP9hz-wMwAv9lSbhNQExwevmYQJp_23Nlcg_VibHO0gUSj_oFhXO0wQjCatb178Qy7gzfyCh4W7_qdhdhB4Lo32__s3bISubEfUd5Ho0",
    tags: ["Java", "OOP", "Multi-threading", "DBMS"],
    githubUrl: "https://github.com/drsvvn25/hospital-management",
    liveUrl: "https://github.com/drsvvn25/",
    demoType: "visibility"
  }
];

export const certifications = [
  {
    title: "Docker Foundations Professional",
    id: "Docker Certified / Linux Foundation",
    icon: "Package",
    color: "text-secondary"
  },
  {
    title: "IBM SkillsBuild - Cyber Security",
    id: "Cyber Security Fundamentals Certificate",
    icon: "Award",
    color: "text-primary"
  },
  {
    title: "IBM SkillsBuild - Data Fundamentals",
    id: "Data Science & Database Essentials",
    icon: "Award",
    color: "text-primary"
  },
  {
    title: "IBM SkillsBuild - Web Development",
    id: "Certified Full Stack Development",
    icon: "Code2",
    color: "text-tertiary"
  },
  {
    title: "HackerRank - Java & Python",
    id: "Verified Problem Solving Specialist",
    icon: "Code2",
    color: "text-tertiary"
  }
];

export const hackathons: Hackathon[] = [
  {
    id: "h-1",
    year: "2026",
    title: "CHARUSET",
    award: "Google Developer Groups Hack",
    borderColor: "border-primary"
  },
  {
    id: "h-2",
    year: "2025",
    title: "Odoo x GCET Hackathon",
    award: "ERP & Automation Innovator",
    borderColor: "border-secondary"
  },
  {
    id: "h-3",
    year: "2025",
    title: "Nexothon GCET",
    award: "Innovative Tech Solutions Winner",
    borderColor: "border-tertiary"
  },
  {
    id: "h-4",
    year: "2024",
    title: "Smart India Hackathon (SIH)",
    award: "National Level Finalist",
    borderColor: "border-indigo-400"
  },
  {
    id: "h-5",
    year: "2023",
    title: "CREATO Hackathon",
    award: "Top Performer Winner",
    borderColor: "border-emerald-400"
  }
];
