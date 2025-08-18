
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    console.log("ask router hit");
    const { query } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a voice command assistant for a wedding planner site.
      Always respond ONLY in strict JSON.
      Do not include markdown formatting or extra text.
      Example:
      User: "open venue page"
      Response: {"action":"open_venue"}
      User: "go home"
      Response: {"action":"open_home"}
      User: "set location to delhi"
      Response: {"action":"set_location", "value":"Delhi"}
      Now process: ${query}
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // 🧹 Remove markdown fences if Gemini adds them
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    res.json({ command: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
