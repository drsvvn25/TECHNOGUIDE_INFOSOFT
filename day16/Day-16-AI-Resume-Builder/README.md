# Day-16 AI Resume Builder

Welcome to **Day 16** of the 100 Days of Code challenge! This project is a fully functional, highly customizable, client-side AI Resume Builder. It allows users to generate professional, ATS-friendly resumes complete with intelligent summary suggestions, skill enhancements, and ATS scoring.

## 🚀 Features

- **Client-side AI Engine:** Generates intelligent summaries, enhances project descriptions, and suggests ATS keywords using a local rules-based JS engine (no external API keys needed!).
- **Live Preview:** Instant, zoomable preview panel that updates exactly as the final PDF will look.
- **Dynamic Content Support:** Add multiple education, experience, project, and certification entries dynamically.
- **ATS Compatibility Scoring:** Real-time feedback on how well your resume is optimized for Applicant Tracking Systems.
- **3 Premium Templates:**
  1. **Modern Developer:** A sleek, gradient-heavy sidebar design for devs.
  2. **Corporate Professional:** Clean, minimal, highly ATS-readable.
  3. **Creative Tech:** Colorful and bold, perfect for designers and front-end devs.
- **PDF Export:** High-quality PDF export powered by `html2canvas` and `jsPDF`.
- **Sample Data Loading:** 1-click loading of a sample B.Tech Information Technology student profile to test the system.

## 📂 Folder Structure

\`\`\`text
Day-16-AI-Resume-Builder/
│
├── index.html                # Main application structure
├── css/
│   ├── style.css             # UI layout, form styling, variables
│   └── templates.css         # Styling for the 3 resume templates
├── js/
│   ├── script.js             # DOM manipulation, form handling
│   ├── resumeGenerator.js    # AI logic, ATS scoring, data models
│   └── pdfExport.js          # jsPDF and html2canvas logic
├── templates/                # (Integrated directly into templates.css/js)
├── assets/                   # For local images and icons
├── sample-resumes/           # Exported sample PDFs
├── prompts/                  # AI Prompts reference (if connecting to external LLMs later)
└── README.md                 # This file
\`\`\`

## 🛠️ Installation & Usage

1. **Clone or Download** this directory.
2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Edge).
   - *Note: Since this is an HTML/JS/CSS app without a backend, you do not need Node.js or any local server to run it. Just double click `index.html`!*
3. **Using the app:**
   - Click **"📂 Load Sample"** to populate the form with demo data.
   - Click the **"✨ AI Generate Summary"** or **"✨ AI Enhance Skills"** buttons to see the AI logic in action.
   - Click **"🤖 Generate Resume with AI"** at the bottom of the form to compile the preview and calculate your ATS score.
   - Use the **Template Cards** to switch between designs instantly.
   - Click **"⬇ Export PDF"** to download the resume.

## 🧠 Future Enhancements

- **Integration with actual LLMs** (like OpenAI or Gemini) via backend endpoints to provide highly customized rewriting.
- **Drag-and-Drop** reordering for experience and project sections.
- **Custom Color Pickers** to override template default colors.
- **Cloud Saving** by integrating Firebase or Supabase to save profiles across devices.

---

*Developed for the TechnoGuide InfoSoft Day-16 Challenge. Happy Coding!*
