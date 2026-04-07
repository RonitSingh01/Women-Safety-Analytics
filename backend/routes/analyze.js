const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @route   POST /api/analyze
// @desc    Analyze situation using LLM and return risk assessment
router.post('/', async (req, res) => {
    try {
        const { text, location, hasImage } = req.body;
        
        // This is a system prompt enforcing the JSON structure
        const systemPrompt = `You are an advanced Women Safety Analytics AI.
Your job is to assess the risk of a given situation and return ONLY a valid JSON response.
Do NOT include Markdown formatting like \`\`\`json.
Structure the JSON exactly like this:
{
  "threatLevel": "Low" | "Medium" | "High",
  "threatScore": number (1-10),
  "analysis": "Short 1-sentence reasoning",
  "safetyTips": ["Tip 1", "Tip 2", "Tip 3"]
}

Context:
- User Location provided: ${location ? JSON.stringify(location) : 'Unknown'}
- Image included: ${hasImage ? 'Yes (Assume potential threat if unclear text)' : 'No'}`;

        const prompt = `User's Situation Description: "${text || 'User did not provide text, evaluating purely based on context.'}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }
            ]
        });

        let aiText = response.text;
        
        // clean up potential markdown
        if (aiText.startsWith('```json')) {
            aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        const analysisResult = JSON.parse(aiText);
        res.json(analysisResult);

    } catch (err) {
        console.error('LLM Analysis Error:', err);
        res.status(500).json({ error: 'Failed to analyze situation', details: err.message });
    }
});

module.exports = router;
