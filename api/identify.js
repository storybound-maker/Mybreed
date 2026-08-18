export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body || {};
    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required.' });
    }

    const prompt = `You are the identification system for Mybreed. Analyze only the living thing actually visible in this photograph. Do not invent fictional creatures or claim that an unseen creature is present. If the image is unclear or does not contain an animal, plant, fungus, or other living organism, say so. Return ONLY valid JSON with these fields: name, category, confidence, description. category must be one of animal, plant, fungus, other_living, unclear. confidence must be a number from 0 to 100. Keep description under 160 characters.`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: mimeType, data: imageBase64 } },
              { text: prompt },
            ],
          }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini error:', data);
      return res.status(502).json({ error: 'The AI service could not analyze the photo.' });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(502).json({ error: 'The AI returned no identification.' });
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'The AI returned an invalid identification.' });
    }

    return res.status(200).json({
      name: String(result.name || 'Unclear'),
      category: String(result.category || 'unclear'),
      confidence: Math.max(0, Math.min(100, Number(result.confidence) || 0)),
      description: String(result.description || ''),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong while identifying the photo.' });
  }
}
