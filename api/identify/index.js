const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
      {
        text: `Identify the animal in this image.

Return ONLY valid JSON in this exact structure:

{
  "animal": "common name",
  "scientificName": "scientific name",
  "confidence": 0,
  "description": "short description"
}

The confidence must be a number from 0 to 100.

If you cannot confidently identify the animal, use "Unknown" for animal and scientificName.`,
      },
    ]);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const identification = JSON.parse(cleaned);

    return res.status(200).json(identification);
  } catch (error) {
    console.error("Gemini identification error:", error);

    return res.status(500).json({
      error: "Failed to identify image",
    });
  }
};