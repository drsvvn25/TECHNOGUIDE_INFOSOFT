import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Using mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST Endpoint for AI Generation
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, tone = "Professional", platform = "LinkedIn" } = req.body;
    
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid prompt parameter." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return high-quality pre-designed content if no API key is specified for a clean fallback
      console.log("No GEMINI_API_KEY. Returning default template post.");
      
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(1200); // Simulate network latency beautifully

      let responseText = "";
      if (prompt.toLowerCase().includes("benefit of ai") || prompt.toLowerCase().includes("small business")) {
        responseText = `Artificial Intelligence isn't just a luxury for tech giants anymore; it's the ultimate growth lever for modern entrepreneurs. By automating repetitive tasks, BusinessBoost AI allows you to focus on high-impact strategy. 🚀\n\nReady to scale with precision? Let's unlock your potential today. #AI #BusinessGrowth #TechTrends`;
      } else {
        responseText = `Here is a custom handcrafted preview for your topic "${prompt}" generated in a ${tone} tone for ${platform}:\n\nStartups thrive on velocity. BusinessBoost AI integrates advanced machinery that streamlines operations, optimizes invoices, and enhances direct client relationships. Leverage our Core Intelligence to build lasting value.\n\nTake the leap. Empower your operations today. #${platform} #SaaS #GrowthMindset`;
      }
      return res.json({ text: responseText, source: "mock-fallback" });
    }

    const systemInstruction = `You are BusinessBoost AI, a premium copywriter and startup acceleration engine.
Generate a social media post or article based on the user's prompt.
Target platform: ${platform} (tailor formatting, emojis, and hashtags to fit ${platform}).
Overall tone: ${tone} (apply this tone beautifully, e.g. "Professional" is sleek and authoritative, "Creative" is inspirational and lively, "Witty" is clever and engaging).
Ensure the reply is highly polished, professional, concise, and ready-to-publish. Do not output markdown code blocks or meta text, just output the raw publishable post text itself.`;

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.82,
      },
    });

    const generatedText = response.text || "Failed to generate content. Please try another prompt.";
    return res.json({ text: generatedText, source: "gemini" });

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({ 
      error: "An error occurred during AI content generation.",
      details: error.message || error 
    });
  }
});

async function startServer() {
  // Vite dev mode vs production routing
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
    console.log(`Server starting on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer();
