import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  Linkedin,
  ExternalLink,
  Code2,
  Award,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  Search,
  Sparkles,
  Package,
  Terminal,
  Brain,
  Layout,
  Server,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Compass
} from "lucide-react";

// Imports from local modules
import BackgroundShader from "./components/BackgroundShader";
import AIModelMesh from "./components/AIModelMesh";
import Navigation from "./components/Navigation";
import AIChatBot from "./components/AIChatBot";
import ContactForm from "./components/ContactForm";
import {
  profileDetails,
  skillsCategories,
  programmingLanguages,
  toolsList,
  experiences,
  selectedWorks,
  certifications,
  hackathons,
} from "./data";
import { Project } from "./types";

export default function App() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Filter systems
  const allTags = ["All", "MERN", "AI/ML", "React", "NextJS", "Python", "Blockchain"];
  
  const filteredWorks = selectedWorks.filter((work) => {
    // Tag matching filter
    const matchesTag =
      selectedTag === "All" ||
      (selectedTag === "MERN" && (work.tags.includes("React") || work.tags.includes("NodeJS"))) ||
      (selectedTag === "AI/ML" && (work.tags.includes("Python") || work.tags.includes("OpenCV") || work.tags.includes("Keras"))) ||
      (selectedTag === "Blockchain" && work.tags.includes("Solidity")) ||
      work.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

    // Search query matching
    const matchesSearch =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTag && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-background text-on-surface font-sans selection:bg-secondary/30 selection:text-white antialiased overflow-x-hidden">
      {/* Dynamic Interactive Backdrop Layer */}
      <BackgroundShader />

      {/* Floating Sparkles and Background Ambient Orbs (Static Decorative Blur) */}
      <div className="absolute top-[30vh] left-[10vw] w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[80vh] right-[10vw] w-96 h-96 bg-secondary/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* Top Banner Navigation */}
      <Navigation />

      {/* Main Structural Layout Wrapper */}
      <main className="relative z-10 pt-28 pb-16">
        
        {/* =============== HERO SECTION =============== */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-24">
          <div className="relative rounded-[32px] glass-card border border-white/5 bg-surface-container-lowest/15 backdrop-blur-md p-6 sm:p-10 lg:p-16 overflow-hidden select-none shadow-2xl">
            
            {/* Interactive Neural Matrix as Background */}
            <div className="absolute inset-0 z-0 opacity-30 md:opacity-45 lg:opacity-65 pointer-events-none">
              <AIModelMesh />
            </div>

            {/* Subtle glow / indicators in corner */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-background/60 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute" />
              <span className="text-[10px] font-mono text-cyan-300">INTERACTIVE NEURAL BACKDROP</span>
            </div>

            {/* Primary Hero Text & CTA Content */}
            <div className="relative z-10 max-w-3xl flex flex-col space-y-6 text-left selection:bg-indigo-500/40">
              {/* Core Role Badge */}
              <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-medium tracking-wide">
                <Terminal className="w-3.5 h-3.5" />
                <span>MERN + Neural Models Integration</span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-3">
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-300 uppercase">
                  Full Stack & AI Engineer
                </h2>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                  DIVY <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">SHAH</span>
                </h1>
              </div>

              {/* Tagline Bio statement */}
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-2xl font-light">
                {profileDetails.tagline}
              </p>

              {/* Call-to-actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-6 py-3.5 bg-linear-to-r from-primary-container to-secondary-container hover:from-indigo-600 hover:to-cyan-500 text-xs font-mono font-bold uppercase tracking-wider rounded-xl text-white transition-all shadow-lg hover:shadow-cyan-500/15 cursor-pointer flex items-center gap-2 shrink-0"
                >
                  Let's Connect <ChevronRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="mailto:drsvvn25@gmail.com"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-6 py-3.5 bg-surface-container-high hover:bg-surface-container-highest border border-white/5 text-xs font-mono tracking-wider uppercase rounded-xl text-white font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  Download Resume <Download className="w-4 h-4 text-cyan-300" />
                </motion.a>
              </div>

              {/* Hero Stats bento strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {profileDetails.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface-container-lowest/50 backdrop-blur-md border border-white/5 shadow-inner"
                  >
                    <span className={`block text-2xl font-display font-extrabold ${stat.color}`}>
                      {stat.value}
                    </span>
                    <span className="block text-[11px] font-mono text-outline uppercase tracking-wider mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* =============== BENTO GRID / ABOUT AREA =============== */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-24">
          <div className="text-center md:text-left mb-10">
            <h3 className="text-xs font-mono text-cyan-300 tracking-widest uppercase">01 // Academic & Core Bio</h3>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">Technical Profile</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Main Bio Grid Box (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl glass-card p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {profileDetails.education.map((edu, idx) => (
                  <div key={idx} className={`relative pb-5 ${idx !== profileDetails.education.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                          <h4 className="font-display font-bold text-base text-white">
                            {edu.degree}
                          </h4>
                          <span className="text-[10px] font-mono text-cyan-300 py-0.5 px-2 rounded-md bg-cyan-400/5 border border-cyan-400/10 shrink-0">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-outline-variant">{edu.institution}</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed font-light mt-1 select-text">
                          {edu.description}
                        </p>
                        <div className="flex items-center gap-1.5 pt-1.5">
                          <span className="text-[10px] font-mono text-outline uppercase tracking-wider">Academic CGPA:</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">{edu.cgpa} / 10.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Highlight details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-0.5">
                  <span className="block text-[11px] font-mono text-outline uppercase tracking-wider">Strategic Focus</span>
                  <p className="text-sm font-display font-medium text-white">MERN Architecture & Intelligent AI Pipelines</p>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[11px] font-mono text-outline uppercase tracking-wider">HQ Coordinates</span>
                  <p className="text-xs font-mono text-secondary">Anand, Gujarat, India</p>
                </div>
              </div>
            </div>

            {/* Right Stack Skill Matrix Grid Box (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-widest">Technological Stack Matrix</h4>
              
              <div className="space-y-4">
                {skillsCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-medium flex items-center gap-2">
                        {cat.icon === "Layout" ? (
                          <Layout className="w-3.5 h-3.5 text-primary" />
                        ) : cat.icon === "Server" ? (
                          <Server className="w-3.5 h-3.5 text-secondary" />
                        ) : (
                          <Brain className="w-3.5 h-3.5 text-tertiary" />
                        )}
                        {cat.title}
                      </span>
                      <span className="text-outline-variant">Structured</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] py-1 px-2.5 rounded-lg bg-surface-container border border-white/5 text-on-surface hover:border-secondary/30 transition-all font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Languages list */}
              <div className="pt-4 border-t border-white/5 space-y-2.5">
                <span className="block text-[10px] font-mono text-outline uppercase tracking-widest">Programming Languages</span>
                <div className="flex flex-wrap gap-2">
                  {programmingLanguages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      className="text-[10px] py-0.5 px-2 rounded-md font-mono text-white border border-white/5 flex items-center gap-1.5 bg-surface-container-low"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${lang.color}`} />
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =============== TIMELINE / EXPERIENCE SECTION =============== */}
        <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <h3 className="text-xs font-mono text-cyan-300 tracking-widest uppercase">02 // Active Chronology</h3>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">Internship Timeline</h2>
          </div>

          <div className="relative border-l border-outline-variant ml-4 sm:ml-6 space-y-12 pb-2">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                {/* Visual Indicator circle */}
                <div className="absolute -left-[9px] top-1.5 w-[16px] h-[16px] rounded-full bg-background border-2 border-cyan-400 group-hover:bg-cyan-300 transition-colors" />
                
                {/* Inner content box */}
                <div className="p-6 rounded-3xl glass-card border border-white/5 group-hover:border-secondary/20 transition-all duration-300 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-xs font-mono text-cyan-300">{exp.company} // Experience</span>
                    <span className={`text-[11px] font-mono py-1 px-3 rounded-full ${exp.periodBadgeColor}`}>
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white">
                    {exp.role}
                  </h4>
                  <p className="text-xs font-mono text-secondary-container"># {exp.tagline}</p>
                  
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light mt-2 select-text">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =============== PORTFOLIO / WORKS SECTION =============== */}
        <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="text-center md:text-left">
              <h3 className="text-xs font-mono text-cyan-300 tracking-widest uppercase">03 // Handcrafted Projects</h3>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">Highlighted Portfolio</h2>
            </div>

            {/* Quick Search Panel */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-outline absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search works..."
                className="w-full text-xs bg-surface-container border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-hidden focus:border-cyan-300 transition-colors"
              />
            </div>
          </div>

          {/* Tag Filter Strip */}
          <div className="flex flex-wrap gap-2 mb-8 justify-start">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs font-mono py-2 px-4 rounded-xl transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-secondary text-background font-bold shadow-lg shadow-cyan-300/15"
                    : "bg-surface-container-low hover:bg-surface-container text-outline hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Project Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8, scale: 1.012, boxShadow: "0 25px 50px -12px rgba(76, 215, 246, 0.15)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="rounded-3xl glass-card overflow-hidden group flex flex-col justify-between border border-white/5 hover:border-secondary/30 transition-all duration-300"
                >
                  {/* Thumbnail Cover image */}
                  <div className="relative h-48 overflow-hidden bg-surface-container-lowest">
                    <img
                      src={work.image}
                      alt={work.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Visual demo badges */}
                    <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap">
                      {work.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono py-0.5 px-2 bg-background/80 backdrop-blur-xs text-white rounded border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body textual content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white select-text">
                        {work.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed mt-2 select-text line-clamp-3">
                        {work.description}
                      </p>
                    </div>

                    {/* Direct action links */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setModalProject(work)}
                        className="py-2.5 px-4 bg-primary-container hover:bg-indigo-600 text-[11px] font-mono font-bold tracking-wider uppercase text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        Interactive Case
                        <Sparkles className="w-3.5 h-3.5 text-secondary" />
                      </button>
                      
                      <a
                        href="https://github.com/drsvvn25"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-surface-container-high hover:bg-surface-container-highest rounded-xl text-outline hover:text-white transition-all cursor-pointer border border-white/5"
                        title="Source Code"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredWorks.length === 0 && (
              <div className="col-span-full py-12 text-center rounded-3xl bg-surface-container-lowest/20 border border-white/5">
                <span className="block text-2xl">🔍</span>
                <p className="text-sm font-mono text-outline mt-2">No matching systems listed in this context.</p>
              </div>
            )}
          </div>
        </section>


        {/* =============== CREDENTIALS / CERTIFICATES & HACKATHONS =============== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Certifications Block */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono text-cyan-300 tracking-widest uppercase">04 // verified badges</h3>
                <h2 className="text-2xl font-display font-bold text-white mt-1">Certifications</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, x: 6, borderColor: "rgba(195, 192, 255, 0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="flex justify-between items-center p-5 rounded-2xl bg-surface-container-lowest/30 backdrop-blur-xs border border-white/5 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-white/8 flex items-center justify-center shrink-0">
                        {cert.icon === "Award" ? (
                          <Award className="w-5 h-5 text-primary" />
                        ) : cert.icon === "Package" ? (
                          <Package className="w-5 h-5 text-secondary" />
                        ) : (
                          <Code2 className="w-5 h-5 text-tertiary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white select-text">
                          {cert.title}
                        </h4>
                        <p className="text-[11px] font-mono text-outline-variant">{cert.id}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 py-0.5 px-2.5 rounded-md bg-cyan-400/5 border border-cyan-400/10 shrink-0">
                      VERIFIED
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Hackathon Medals Block */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono text-cyan-300 tracking-widest uppercase">05 // award history</h3>
                <h2 className="text-2xl font-display font-bold text-white mt-1">Hackathons</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hackathons.map((h) => (
                  <motion.div
                    key={h.id}
                    whileHover={{ scale: 1.03, y: -4, borderColor: "rgba(76, 215, 246, 0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="p-5 rounded-2xl bg-surface-container-lowest/30 backdrop-blur-xs border border-white/5 transition-all flex flex-col justify-between h-36"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono text-outline-variant tracking-wider">{h.year} // HACKATHON</span>
                      <Award className="w-4 h-4 text-cyan-300 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-medium text-sm text-white">{h.title}</h4>
                      <p className="text-xs font-mono text-secondary">{h.award}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* =============== CONTACT FORM SECTION =============== */}
        <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-24">
          <div className="text-center mb-10">
            <h3 className="text-xs font-mono text-cyan-300 tracking-widest uppercase">06 // initialize dialogue</h3>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">Get In Touch</h2>
            <p className="text-xs sm:text-sm text-outline mt-2 leading-relaxed max-w-md mx-auto">
              Ready to construct something spectacular? Send your system signals below, and let's configure high performance software.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ContactForm />
          </div>
        </section>

      </main>


      {/* =============== FOOTER SECTION =============== */}
      <footer className="border-t border-white/5 bg-surface-container-lowest/40 backdrop-blur-sm py-12 relative z-10 selection:bg-indigo-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left signature */}
            <div>
              <p className="text-sm font-display font-medium text-white tracking-widest">
                DIVY SHAH <span className="text-secondary opacity-60">//</span> PORTFOLIO
              </p>
              <p className="text-[11px] font-mono text-outline mt-1.5 uppercase tracking-wider">
                Built with React, WebGL Space Shaders, and Gemini-3.5-Flash
              </p>
            </div>

            {/* Middle social badges */}
            <div className="flex gap-4">
              <a
                href={profileDetails.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center border border-white/8 text-outline hover:text-white transition-all cursor-pointer shadow-md"
                title="LinkedIn"
              >
                <img src={profileDetails.socials.linkedinIcon} alt="LinkedIn" className="w-4 h-4 invert opacity-75 hover:opacity-100" />
              </a>
              <a
                href={profileDetails.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center border border-white/8 text-outline hover:text-white transition-all cursor-pointer shadow-md"
                title="GitHub"
              >
                <img src={profileDetails.socials.githubIcon} alt="GitHub" className="w-4 h-4 invert opacity-75 hover:opacity-100" />
              </a>
              <a
                href={profileDetails.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center border border-white/8 text-outline hover:text-white transition-all cursor-pointer shadow-md"
                title="Twitter"
              >
                <img src={profileDetails.socials.twitterIcon} alt="Twitter" className="w-4 h-4 invert opacity-75 hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-outline-variant">
            <p>© {new Date().getFullYear()} Divy Shah. All rights preserved.</p>
            <p>Anand, Gujarat, India // drsvvn25@gmail.com</p>
          </div>
        </div>
      </footer>


      {/* =============== CASE STUDY COMPOSITION DIALOG =============== */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-surface-container-low border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden shrink-0">
                <img
                  src={modalProject.image}
                  alt={modalProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-container-low via-transparent to-transparent" />
                <button
                  onClick={() => setModalProject(null)}
                  className="absolute top-4 right-4 bg-background/60 hover:bg-background/90 text-white p-2 rounded-full cursor-pointer transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-left scrollbar-hidden">
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-extrabold text-white">{modalProject.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {modalProject.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono py-0.5 px-2 bg-primary/10 text-primary rounded border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant font-light leading-relaxed select-text">
                  {modalProject.description}
                </p>

                {/* Simulated Capabilities Showcase */}
                <div className="p-4 rounded-xl bg-surface-container-lowest/50 border border-white/5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SIMULATED SUBSYSTEM DATA</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono text-[11px] text-outline">
                    <div>
                      <span>Status:</span>
                      <p className="text-white font-bold text-xs mt-0.5">● Fully Deployed</p>
                    </div>
                    <div>
                      <span>Performance Index:</span>
                      <p className="text-emerald-400 font-bold text-xs mt-0.5">99.2% Responsive</p>
                    </div>
                    <div>
                      <span>Datastore:</span>
                      <p className="text-white font-bold text-xs mt-0.5">
                        {modalProject.title === "Sign Bridge AI" ? "Local Neural Weights" : "Secure API Proxy"}
                      </p>
                    </div>
                    <div>
                      <span>Engineering Stack:</span>
                      <p className="text-white font-bold text-xs mt-0.5">MERN Module v5.24</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-white/5 bg-surface-container flex items-center justify-end gap-3 shrink-0">
                <button
                  onClick={() => setModalProject(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/8 bg-surface-container-low text-xs font-mono text-outline hover:text-white transition-colors cursor-pointer"
                >
                  Close Case
                </button>
                <a
                  href="https://github.com/drsvvn25"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-indigo-600 text-xs font-mono text-white flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
                >
                  Launch Demo Code <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* =============== FLOATING CHAT ASSISTANT =============== */}
      <AIChatBot />

    </div>
  );
}

// Inline minimalist X icon since it was needed to close modal cleanly
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
