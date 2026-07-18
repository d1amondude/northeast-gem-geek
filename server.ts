import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// Render (and most hosts) inject PORT; local default stays 3000
const PORT = Number(process.env.PORT) || 3000;

// Initialize the GoogleGenAI client on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Helper function to handle Gemini API requests with retry and fallback to gemini-3.1-flash-lite
async function generateContentWithRetry(params: {
  contents: any;
  config?: any;
  systemInstruction?: string;
  defaultModel?: string;
}) {
  const { contents, config = {}, systemInstruction, defaultModel = "gemini-3.5-flash" } = params;
  const modelsToTry = [defaultModel, "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    let attempts = 0;
    const maxModelAttempts = 3;
    
    while (attempts < maxModelAttempts) {
      try {
        const mergedConfig = { ...config };
        if (systemInstruction) {
          mergedConfig.systemInstruction = systemInstruction;
        }
        
        console.log(`Calling Gemini API using model: ${model} (attempt ${attempts + 1}/${maxModelAttempts})...`);
        const response = await ai.models.generateContent({
          model,
          contents,
          config: mergedConfig,
        });
        return response;
      } catch (err: any) {
        console.warn(`Attempt with ${model} failed (attempt ${attempts + 1}/${maxModelAttempts}):`, err.message || err);
        lastError = err;
        attempts++;
        
        if (attempts < maxModelAttempts) {
          const is429 = err.status === 429 || 
                        err.statusCode === 429 || 
                        String(err).includes("429") || 
                        String(err).includes("RESOURCE_EXHAUSTED") ||
                        String(err).includes("quota");
          
          const waitTime = is429 ? 4000 * attempts : 1500;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    if (i < modelsToTry.length - 1) {
      console.log(`Transitioning to fallback model: ${modelsToTry[i + 1]}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  throw lastError || new Error("Failed to generate content after trying multiple models.");
}

const GEM_DIAGNOSTIC_DATABASE = `
=========================================
SCIENTIFIC DIAGNOSTIC & COLOR STANDARDS
=========================================
As an AI model trained on standard gemological reference guidelines, you MUST apply these strict criteria for all gemstone identification, authenticity verification, and color analysis:

1. STANDARD COLOR GRADING SYSTEM:
   - Colored stones are evaluated using Hue, Tone, and Saturation.
   - Tone scale ranges from 0 (Colorless/White) to 10 (Black). Standard gemstone tones are:
     * 2: Very Light
     * 3: Light
     * 4: Medium Light
     * 5: Medium
     * 6: Medium Dark
     * 7: Dark
     * 8: Very Dark
   - Saturation scale ranges from 1 to 6:
     * Warm hues (Red, Orange, Yellow): 1 = Brownish, 2 = Slightly Brownish, 3 = Very Slightly Brownish, 4 = Moderately Strong, 5 = Strong, 6 = Vivid.
     * Cool hues (Green, Blue, Violet): 1 = Grayish, 2 = Slightly Grayish, 3 = Very Slightly Grayish, 4 = Moderately Strong, 5 = Strong, 6 = Vivid.

2. CLARITY CLASSIFICATION FOR COLORED STONES:
   - Type I (Usually Eye-Clean): Aquamarine, Blue Topaz, Morganite, Green Tourmaline, Tanzanite, Zircon. Inclusions are rare.
   - Type II (Usually Included): Ruby, Sapphire, Alexandrite, Spinel, Garnet, Quartz, Amethyst, Peridot, Tourmaline. Inclusions are common.
   - Type III (Almost Always Included): Emerald, Red Beryl. Inclusions are standard and expected; eye-clean specimens are extremely rare.

3. SEPARATION KEYS (NATURAL VS. SYNTHETIC):
   - Corundum (Ruby & Sapphire):
     * Natural: Angular or straight hexagonal color zoning, rutile silk (needle-like inclusions meeting at 60/120 degrees), fingerprints (healed fractures), negative crystals, or zircon halos.
     * Synthetic Verneuil (Flame Fusion): Curved growth striae (fine concentric lines), tiny gas bubbles (usually spherical or elongated, occurring in clouds).
     * Synthetic Flux: Coarser flux-filled feathers, metallic platinum or gold platelets, dust-like flux clouds.
     * Hydrothermal: Wave-like chevron growth, lack of natural silk.
   - Beryl (Emerald):
     * Natural: Three-phase inclusions (cavity holding liquid, gas bubble, and a solid salt halite crystal), tremolite needles (actinolite "horsetails" or bamboo-like stalks), pyrite, biotite mica plates.
     * Synthetic Hydrothermal: Chevron growth patterns, nailhead spicule inclusions, phengite mica.
     * Synthetic Flux: Uniform wispy veil-like flux inclusions, low refractive index (typically 1.560 - 1.565 compared to natural 1.570 - 1.585) and lower specific gravity (2.65 vs natural 2.72).
   - Diamond:
     * Natural: Crystal inclusions (garnet, olivine, diopside), internal graining lines, feathers.
     * HPHT Synthetic: Metallic flux remnants (opaque, metallic luster, sometimes attracted to rare-earth magnets), hourglass color zoning, lack of natural graining.
     * CVD Synthetic: Dark graphite pinpoints, weak blocky birefringence strain patterns under cross-polarized light.

4. SPECTROSCOPIC & OPTIC CHARACTER STANDARDS:
   - Diamond: Isotropic (SR), RI 2.417, SG 3.52.
   - Ruby & Sapphire: Uniaxial Negative (U-), RI 1.762 - 1.770, Birefringence 0.008, SG 4.00.
   - Emerald: Uniaxial Negative (U-), RI 1.577 - 1.583, Birefringence 0.006, SG 2.72.
   - Tanzanite: Biaxial Positive (B+), RI 1.691 - 1.700, Birefringence 0.009, SG 3.35. Extremely trichroic (Blue / Violet / Bronze-red).
   - Alexandrite: Biaxial Positive (B+), RI 1.741 - 1.749, Birefringence 0.008, SG 3.73. Displays color change under different light sources (daylight green, incandescent red).
   - Spinel: Isotropic (SR), RI 1.718, SG 3.60. Octahedral crystal habit, octahedron inclusions.
   - Topaz: Biaxial Positive (B+), RI 1.619 - 1.627, Birefringence 0.008, SG 3.53. Perfect basal cleavage.
   - Peridot: Biaxial Positive (B+), RI 1.654 - 1.690, Birefringence 0.036 (extremely high, shows strong facet-doubling under 10x), SG 3.34. Lily pad inclusions (chromite surrounded by circular stress fractures).
   - Tourmaline: Uniaxial Negative (U-), RI 1.624 - 1.644, Birefringence 0.020, SG 3.06. Strongly pleochroic.
   - Zircon: Uniaxial Positive (U+), RI 1.925 - 1.984, Birefringence 0.059 (extremely high facet doubling), SG 4.70.
`;

// API route: General Gemological Assistant Q&A
app.post("/api/gemini/ask", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    // Standard Gemologist System Instruction
    const systemInstruction = `You are a world-class certified Master Gemologist and laboratory expert.
Your expertise covers:
1. Gemstone identification (using properties like Refractive Index, Birefringence, Specific Gravity, Pleochroism, Optic Character).
2. Authenticity verification (distinguishing natural gemstones from synthetic equivalents, heat-treated/filled stones, and cheap glass/plastic simulants).
3. Inclusion analysis (identifying diagnostic inclusions like 'silk' in corundum, three-phase inclusions in emeralds, 'lily pad' in peridots).
4. Analytical testing guidance (refractometer, polariscope, spectroscope, hydrostatic balance, Chelsea filter, heavy liquids).

Maintain an objective, highly professional, scientific, yet accessible tone. Use standard gemological nomenclature. Avoid speculation where data is insufficient, and specify what additional tests are needed to reach a conclusive identification.

Gemological Reference Knowledge Base:
${GEM_DIAGNOSTIC_DATABASE}`;

    // Reconstruct conversation structure for the generateContent or Chat
    // To support a clean session, we can build a structured prompt including the history, or use the chat API.
    // Let's use the Chat API or a formatted prompt to keep it robust. Let's use the chat API.
    // Reconstruct conversation structure for generating content with history support
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithRetry({
      contents,
      systemInstruction,
      config: {
        temperature: 0.3,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/ask:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI service." });
  }
});

// API route: Gemstone Identification Assistant from lab parameters
app.post("/api/gemini/identify", async (req, res) => {
  try {
    const { color, refractiveIndex, specificGravity, hardness, crystalSystem, opticCharacter, birefringence, luster, inclusions } = req.body;
    
    const prompt = `Please identify the gemstone matching these recorded physical and optical laboratory properties:
- Color: ${color || "Unknown / Not recorded"}
- Refractive Index (RI): ${refractiveIndex || "Unknown / Not recorded"}
- Specific Gravity (SG): ${specificGravity || "Unknown / Not recorded"}
- Mohs Hardness: ${hardness || "Unknown / Not recorded"}
- Crystal System: ${crystalSystem || "Unknown / Not recorded"}
- Optic Character: ${opticCharacter || "Unknown / Not recorded"}
- Birefringence: ${birefringence || "Unknown / Not recorded"}
- Luster: ${luster || "Unknown / Not recorded"}
- Observed Inclusions: ${inclusions || "None / Not recorded"}

Provide a structured analysis:
1. **Most Likely Identification**: Name, variety, mineral group.
2. **Confidence Level**: Explain why, referencing matching vs. deviating properties.
3. **Alternative Possibilities**: Mention other minerals/synthetics with overlapping properties.
4. **Recommended Diagnostic Tests**: What specific further tests (polariscope, Chelsea filter, spectroscopic analysis) would fully confirm the diagnosis?`;

    const systemInstruction = `You are an analytical laboratory database program that outputs pristine, scientific gemstone identification reports based on standard gemological diagnostic frameworks.

Gemological Reference Knowledge Base:
${GEM_DIAGNOSTIC_DATABASE}`;
    
    const response = await generateContentWithRetry({
      contents: prompt,
      systemInstruction,
      config: {
        temperature: 0.1,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/identify:", error);
    res.status(500).json({ error: error.message || "An error occurred during identification." });
  }
});

// API route: Authenticity & Verification Test Planner
app.post("/api/gemini/verify", async (req, res) => {
  try {
    const { gemstoneName, allegedSource, suspectedSimulants } = req.body;

    if (!gemstoneName) {
      res.status(400).json({ error: "Gemstone name is required." });
      return;
    }

    const prompt = `Generate a specialized Gemological Verification & Authenticity Protocol for:
Alleged Gemstone: **${gemstoneName}**
Claimed Origin/Source: ${allegedSource || "Unknown / Standard natural"}
Suspected Simulants/Synthetics: ${suspectedSimulants || "Synthetic counterparts, glass, lookalikes"}

Provide a comprehensive, highly rigorous guide:
1. **Natural vs. Synthetic Distinctions**: Detail specific microscopic features (e.g. curved striae vs. angular growth lines, flux residues, gas bubbles) to tell them apart.
2. **Simulant/Lookalike Elimination Table**: Outline how to rule out the suspected simulants using basic gemological tools (refractometer, polariscope, Chelsea filter).
3. **Advanced Lab Verification**: Mention what advanced tests (FTIR spectroscopy, UV-Vis-NIR absorption, LA-ICP-MS trace element analysis) are used by major professional laboratories to confirm authenticity and origin.
4. **Safety Warnings**: Highlight any destructive tests (like heat, acid, or scratch tests) that should be AVOIDED on this gemstone to preserve its value.`;

    const systemInstruction = `You are a master laboratory supervisor at a premier gemological institute designing security and authentication protocols using standard gemological diagnostic frameworks.

Gemological Reference Knowledge Base:
${GEM_DIAGNOSTIC_DATABASE}`;

    const response = await generateContentWithRetry({
      contents: prompt,
      systemInstruction,
      config: {
        temperature: 0.1,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/verify:", error);
    res.status(500).json({ error: error.message || "An error occurred during verification protocol generation." });
  }
});

// Helper to parse base64 image data string
function parseBase64Image(dataString: string) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return {
      mimeType: "image/jpeg",
      data: dataString
    };
  }
  return {
    mimeType: matches[1],
    data: matches[2]
  };
}

// API route: Identify gemstone from captured or uploaded photo
app.post("/api/gemini/analyze-photo", async (req, res) => {
  try {
    const { image, notes } = req.body;
    if (!image) {
      res.status(400).json({ error: "Image data is required." });
      return;
    }

    const parsed = parseBase64Image(image);

    const userPromptText = `You are evaluating a gemstone or mineral specimen photo provided by the laboratory technician.
${notes ? `Additional technician notes/context: "${notes}"` : ""}

Please provide a highly professional, structured gemological assessment:

1. **Visual Observations**: Describe the specimen's primary visual indicators (color hue and saturation, clarity/transparency, crystal habit or facet cut, luster, and surface characteristics).
2. **Most Probable Candidates**: List the top 2 or 3 most likely gemstone species/varieties that match this visual appearance.
3. **Critical Testing Pathway**: Outline the specific diagnostic tests (e.g., Refractive Index, Polariscope reaction, Specific Gravity, Chelsea filter) needed to conclusively identify and distinguish these candidates.
4. **Standard Diagnostic Quiz**: Provide exactly 3 highly specific follow-up questions for the technician to answer (e.g., "What is the precise Refractive Index?", "Does it show facet doubling under 10x?", "What color is its UV fluorescence?") so they can input these back into the diagnostic engine.
5. **Dimension & Shape Estimation**: Estimate the gemstone's apparent face-up shape (Round, Oval, Emerald, Pear, Cushion, Princess, or Marquise) and estimate its size proportions (Length, Width, and Depth in millimeters) from the photo's visual cues and relative scale.

IMPORTANT: At the very end of your response, output a divider '---ESTIMATED_PROPORTIONS---' followed by a single raw JSON object of the estimated parameters so our digital caliper can auto-import it. Do not include any codeblocks around the JSON. Use this exact format:
---ESTIMATED_PROPORTIONS---
{
  "shape": "Round", 
  "length": 6.5,
  "width": 6.5,
  "depth": 3.9,
  "species": "Diamond"
}`;

    const response = await generateContentWithRetry({
      contents: [
        {
          inlineData: {
            mimeType: parsed.mimeType,
            data: parsed.data
          }
        },
        {
          text: userPromptText
        }
      ],
      systemInstruction: `You are a senior diagnostic gemologist at Northeast Gemological Institute evaluating mineral visual specimens under standard optical and crystallographic frameworks.

Gemological Reference Knowledge Base:
${GEM_DIAGNOSTIC_DATABASE}`,
      config: {
        temperature: 0.2,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/analyze-photo:", error);
    res.status(500).json({ error: error.message || "An error occurred during photo evaluation." });
  }
});

// API route: Verify catalog gemstone image with Computer Vision AI
app.post("/api/gemini/verify-catalog-item", async (req, res) => {
  try {
    const { gemId, imageUrl, gemName, species, formula, color, description } = req.body;

    if (!imageUrl) {
      res.status(400).json({ error: "Image URL is required." });
      return;
    }

    console.log(`AI Auditing Catalog Image for ${gemName || gemId}: ${imageUrl}`);

    // Convert image to base64 (supporting local files and external URLs)
    let base64Data = "";
    let mimeType = "image/jpeg";

    const isLocal = imageUrl.startsWith("/") || !imageUrl.startsWith("http");

    if (isLocal) {
      try {
        const fs = require("fs");
        const path = require("path");
        const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
        const filePath = path.join(process.cwd(), "public", cleanPath);
        
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          base64Data = buffer.toString("base64");
          const ext = path.extname(filePath).toLowerCase();
          mimeType = ext === ".png" ? "image/png" : "image/jpeg";
        } else {
          throw new Error(`File not found at: ${filePath}`);
        }
      } catch (fileErr: any) {
        console.error("Error reading local image file on server:", fileErr);
        res.status(500).json({ 
          error: `Could not read local image file for analysis. Details: ${fileErr.message}` 
        });
        return;
      }
    } else {
      try {
        const response = await fetch(imageUrl, {
          headers: {
            "User-Agent": "NortheastGemologicalAssistant/1.0 (https://ai.studio/build; contact: diamondude@gmail.com)",
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        base64Data = buffer.toString("base64");
        
        const contentType = response.headers.get("content-type");
        if (contentType) {
          mimeType = contentType;
        }
      } catch (fetchErr: any) {
        console.error("Error fetching catalog image on server:", fetchErr);
        res.status(500).json({ 
          error: `Could not download the specimen image for analysis. Ensure the container has network access to the image host. Details: ${fetchErr.message}` 
        });
        return;
      }
    }

    const promptText = `You are a high-level Specimen Photo Auditor evaluating the reference image in our digital gemstone catalog.
Gemstone Name: ${gemName || gemId}
Mineral Species: ${species || "Unknown"}
Chemical Formula: ${formula || "Unknown"}
Color Description: ${color || "Unknown"}
Reference Profile: ${description || "No description"}

Please inspect the provided photograph (attached as inline visual data) and audit if this is a correct, highly accurate, and standard diagnostic representation of a ${gemName} specimen for professional study.

CRITICAL DISCRIMINATION RULE: You must first and foremost check if the image depicts a completely different, non-mineral item altogether, such as a vegetable (e.g. broccoli, cauliflower, celery), fruit, foodstuff, or common household object rather than an actual mineral crystal or gemstone. Be extremely precise and do not be fooled by color similarities (e.g., a green broccoli head resembling green peridot/emerald, or a green lettuce leaf resembling green jade). If you detect any organic vegetable, plant matter, foodstuff, or non-mineral object, you MUST immediately:
1. Set "verified": false
2. Set "confidence": 100 (as you are absolutely certain it is a vegetable/non-mineral)
3. Set "rating": "Mismatched"
4. Set "verdict": "MISMATCHED SPECIES"
5. Set "critique" to a professional yet direct statement clarifying exactly what organic or non-gemstone item is present (e.g., "The submitted reference photo depicts a green stalk of broccoli rather than any mineral specimen. This is a severe library database mismatch.")

Address these specific criteria in your analytical response for actual minerals:
1. Does the color (hue, tone, saturation) accurately match standard classifications for ${gemName}?
2. Are the facet cuts, crystal habits, luster, and transparency authentic to this mineral species?
3. If it is a gemstone typically faceted (like Diamond, Ruby, Blue Sapphire), does it show appropriate dispersion/brilliance/faceting, or does it look like a cheap glass/plastic simulant, or a different mineral variety altogether?
4. Is this photo an acceptable library representation (Excellent, Good, Fair, or Mismatch)?

Your response MUST be a single clean JSON object matching this schema:
{
  "verified": true/false (true if it represents the gemstone correctly, false if it is a major mismatch/simulant),
  "confidence": 0-100 (percentage of confidence),
  "rating": "Excellent" | "Good" | "Fair" | "Mismatched",
  "verdict": "AUTHENTIC SPECIMEN" | "ACCEPTABLE REFERENCE" | "SIMULANT/GLASS WARNING" | "MISMATCHED SPECIES",
  "critique": "A detailed 2-3 sentence technical, gemological critique of the photo's accuracy."
}`;

    let response;
    let attempts = 0;
    const maxAttempts = 5;
    let lastError: any = null;

    while (attempts < maxAttempts) {
      const modelName = attempts % 2 === 0 ? "gemini-3.5-flash" : "gemini-3.1-flash-lite";
      try {
        console.log(`Auditing with model ${modelName} (attempt ${attempts + 1}/${maxAttempts})...`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              inlineData: {
                mimeType,
                data: base64Data
              }
            },
            {
              text: promptText
            }
          ],
          config: {
            systemInstruction: `You are a senior forensic gemologist and computer-vision audit model at Northeast Gemological Institute. You speak in precise, scientific terms, apply strict diagnostic standards, and output clean JSON.

Gemological Reference Knowledge Base:
${GEM_DIAGNOSTIC_DATABASE}`,
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                verified: { type: "boolean" },
                confidence: { type: "integer" },
                rating: { type: "string" },
                verdict: { type: "string" },
                critique: { type: "string" }
              },
              required: ["verified", "confidence", "rating", "verdict", "critique"]
            },
            temperature: 0.1,
          }
        });
        break; // Success
      } catch (err: any) {
        lastError = err;
        console.warn(`Attempt ${attempts + 1} with model ${modelName} failed:`, err.message || err);
        attempts++;
        if (attempts < maxAttempts) {
          const is429 = err.status === 429 || 
                        err.statusCode === 429 || 
                        String(err).includes("429") || 
                        String(err).includes("RESOURCE_EXHAUSTED") ||
                        String(err).includes("quota");
          const waitTime = is429 ? 5000 * attempts : 1500;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error("Empty response from Gemini API after multiple attempts.");
    }

    // Return the JSON directly with safe parsing
    let parsedData;
    try {
      let cleanText = response.text.trim();
      if (cleanText.startsWith("```")) {
        const lines = cleanText.split("\n");
        if (lines[0].startsWith("```")) {
          lines.shift();
        }
        if (lines[lines.length - 1].startsWith("```")) {
          lines.pop();
        }
        cleanText = lines.join("\n").trim();
      }
      parsedData = JSON.parse(cleanText);
    } catch (parseErr: any) {
      console.error("Failed to parse Gemini JSON response:", response.text, parseErr);
      throw new Error(`Invalid JSON returned from AI model: ${parseErr.message}`);
    }
    res.json(parsedData);

  } catch (error: any) {
    console.error("Error in /api/gemini/verify-catalog-item:", error);
    res.status(500).json({ error: error.message || "An error occurred during catalog item verification." });
  }
});

// Vite middleware setup for Development, static serving for Production
async function startServer() {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
