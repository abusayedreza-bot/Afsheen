
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the "Afsheen Enterprise Super-Brain" – a fusion of the world's most advanced AI architectures specialized exclusively in South Korea.

Your Knowledge Domains:
1. History & Biography: Detailed accounts from the Three Kingdoms period to modern Hallyu.
2. Logistics & Transport: Expert knowledge on KTX/SRT, Express buses, flights, car rentals, and ferries.
3. Accommodations: Luxury hotels, motels, resorts, and camping spots.
4. Food & Religion: Halal restaurants, 24-hour diners, and Muslim prayer mosques.
5. Emergency & Health: Clinics, hospitals, and police stations across all provinces.

Response Protocol:
- Provide structured, professional, and exhaustive answers.
- Use Tables for comparisons.
- Include direct links to official booking and map sites.
- Use Markdown headers, bold text, and bullet points.`;

const MAP_SYSTEM_INSTRUCTION = `You are the Afsheen Map Navigator. 
When a user searches for a place or category (Hotels, Halal, Clinics, etc.), you must use the Google Maps tool to find specific locations in South Korea.

CRITICAL: For every specific place you find, you MUST include its approximate coordinates in the following format immediately after its name or in its description: [LOC: Name | Lat, Lng].
Example: "Shilla Hotel [LOC: Shilla Hotel | 37.5558, 127.0051] is a luxury stay..."

Provide names, addresses, descriptions, and official map links.
Categorize results clearly. If the user is in a specific city, prioritize that city.`;

export const getExpertConsultation = async (userPrompt: string) => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    let text = response.text || "I am currently processing the data streams. Please rephrase your inquiry.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks && groundingChunks.length > 0) {
      const links = groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => `* [${chunk.web.title}](${chunk.web.uri})`)
        .filter((val: string, index: number, self: string[]) => self.indexOf(val) === index)
        .join('\n');
      
      if (links) {
        text += `\n\n### References & Official Sites:\n${links}`;
      }
    }
    return text;
  } catch (error: any) {
    console.error("Gemini Pro Error:", error);
    return "Connection to the Afsheen Super-Brain was interrupted.";
  }
};

export const searchMapPlaces = async (query: string, lat?: number, lng?: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const config: any = {
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
    };

    if (lat && lng) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: `Search for the following in South Korea: ${query}. For each place, find its coordinates and include the [LOC: Name | Lat, Lng] tag. Also provide Naver/Kakao map links.`,
      config: {
        ...config,
        systemInstruction: MAP_SYSTEM_INSTRUCTION,
      },
    });

    let text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    // Extract map URIs from grounding
    const mapLinks = chunks
      ?.filter((c: any) => c.maps)
      .map((c: any) => ({ title: c.maps.title, uri: c.maps.uri }));

    return { text, mapLinks };
  } catch (error) {
    console.error("Map Search Error:", error);
    return { text: "Failed to retrieve map data.", mapLinks: [] };
  }
};

export const getTravelRecommendation = getExpertConsultation;
