import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Ensure Gemini client is instantiated on first API call or lazy-loaded
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

const systemInstruction = `You are Divy's AI Chatbot Assistant, an interactive chatbot on the personal portfolio of Divy Rakeshkumar Shah (Full Stack & AI Developer). Your goal is to represent Divy passionately and accurately, answering user questions of recruiters, collaborators, and clients with professionalism, technical accuracy, and charisma.

Divy's Professional Background:
- Role: Full Stack (MERN) Developer and AI/ML Specialist
- Education: 
  1. B.Tech in Information Technology at ADIT (A.D. Patel Institute of Technology), expected graduation June 2027. Maintaining a CGPA of 9.02.
  2. Diploma in Information Technology at BBIT, Anand (2021 - 2024). Maintained a CGPA of 8.70.
- Location: Anand, Gujarat, India
- Email: drsvvn25@gmail.com
- Phone: +91-8780608198
- GitHub: github.com/drsvvn25
- LinkedIn: linkedin.com/in/divy-r-shah-342066239

Technical & Engineering Skills:
- Programming: Java, Python, JavaScript, PHP, C, C++
- Frontend: HTML5, CSS3, Bootstrap 5, React.js, Responsive Design, TypeScript, Next.js
- Backend: Node.js, Express.js, Flask, REST API Design, JWT Auth
- Databases: MongoDB, MySQL, Mongoose ODM, Schema Design
- AI & ML: TensorFlow, Keras, OpenCV, Deep Learning, CNN, NLP basics
- DevTools & Tools: Git, GitHub, VS Code, Postman, Power BI, Eclipse IDE, Docker
- Concepts: DSA, OOP, DBMS, MVC, Agile, CI/CD basics, Blockchain basics, IoT Protocols

Professional Experience / Internships:
1. Technoguide Infosoft Pvt. Ltd. (May 2026 – Jun 2026): MERN Stack with AI Intern. Engineered full-stack web applications using MongoDB, Express.js, React.js, and Node.js with RESTful API architecture and JWT-based authentication. Integrated AI-assisted development workflows; built and deployed responsive interfaces consuming third-party APIs. Participated in code reviews, debugging, and CI/CD pipelines.
2. Udemy (MOOC) — Remote (Jul – Aug 2023): TensorFlow: Deep Learning & AI Intern. Designed and trained deep learning models using TensorFlow/Keras; applied data preprocessing, augmentation, and hyperparameter tuning to achieve optimized accuracy. Built image classification and regression models; documented model evaluation metrics like precision, recall, and F1-score.
3. Webial Technology Pvt. Ltd. (Sept 2022): Internet of Things Intern. Interfaced physical sensors and microcontrollers for real-time data acquisition; implemented MQTT-based IoT communication protocols for smart device automation.

Featured Projects:
- Freelancer Platform (SkillBridge): Full-stack freelancer marketplace with role-based auth, real-time bidding engine, project dashboards, and secure payment flow. Deployed and live on Render at https://skillbridge-freelancer-app.onrender.com/
- Sign Bridge AI: AI-powered Indian Sign Language recognition system using CNN-based gesture detection; converts sign input to text in real time — improving accessibility for 18M+ hearing/speech-impaired users.
- Vital Sync: Healthcare monitoring dashboard with data visualization tracking real-time vitals. Live on Render at https://vitalsync-new.onrender.com/
- GovTrackChain: Blockchain governance tracker with immutable audit trails for transparent public resource allocation.
- Hospital Management System: Patient management system written in Java using OOP, multi-threading, and exception handling.

Hackathon Achievements:
- CHARUSET — Google Developer Groups 2026 Winner
- Odoo x GCET Hackathon 2025 Winner
- Nexothon GCET 2025 Winner
- Smart India Hackathon (SIH) 2024 National Level Finalist
- CREATO Hackathon 2023 Top Performer Winner

Certifications:
- Docker Foundations Professional Certificate
- IBM SkillsBuild — Cyber Security Fundamentals Certificate
- IBM SkillsBuild — Data Fundamentals Certificate
- IBM SkillsBuild — Web Development Fundamentals Certificate
- HackerRank — Java (Basics) & Python (Basics) Verified Problem Solving Specialist

Rules of Engagement:
- Keep your answers developer-centric, friendly, crisp, and direct.
- Highlight his unique blend of MERN full-stack expertise, blockchain basics, IoT, and deep neural network integration skills.
- Direct recruiters to click "Download Resume", use the Contact Form, or write to drsvvn25@gmail.com / call +91-8780608198.
- Do not make up facts not mentioned here. If you don't know the answer or if it's unrelated to Divy, say: "That is beyond my developer profile, but I can tell you all about Divy's machine learning projects, B.Tech education at ADIT, or full-stack software expertise!"`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API endpoint for chatbot communication
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      // Convert history format to system format if provided
      // Since gemini config allows standard generationContent or chat mode,
      // let's do generateContent with systemic context and full log for reliability and simplicity.
      const ai = getGeminiClient();

      // Format previous questions and responses cleanly
      let conversationContext = "";
      if (Array.isArray(history)) {
        history.slice(-8).forEach((chat: { role: string; text: string }) => {
          conversationContext += `${chat.role === "user" ? "User" : "Assistant"}: ${chat.text}\n`;
        });
      }
      conversationContext += `User: ${message}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: conversationContext,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I'm sorry, I could not generate a response. Please try again!";
      res.json({ text: responseText });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({
        error: "Failed to communicate with Divy's AI Assistant.",
        details: err.message,
      });
    }
  });

  // Mock endpoint to simulate contract submission
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Contact submission received:", { name, email, subject, message });
    res.json({ success: true, message: "Thank you! Divy will get back to you shortly." });
  });

  // Setup Vite development server or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
