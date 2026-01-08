
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

/**
 * Uses Gemini AI to analyze artwork metadata and generate an enhanced description,
 * poetry, and conceptual tags.
 */
export const enhanceArtworkDescription = async (
  title: string,
  medium: string,
  description: string
): Promise<AIAnalysisResult | null> => {
  try {
    // Initializing the Gemini AI client with the API key from environment variables.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview for high-quality, low-latency text generation.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class art historian and philosopher. 
      Analyze the following artwork and provide deep, evocative insights:
      Title: ${title}
      Medium: ${medium}
      Original Description: ${description}
      
      Requirements:
      1. A sophisticated philosophical summary of the piece (3-4 sentences).
      2. A short, evocative poem inspired by the work (4-6 lines).
      3. A set of 5 relevant conceptual tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A professional and deep philosophical analysis."
            },
            suggestedPoetry: {
              type: Type.STRING,
              description: "An evocative poem capturing the artwork's essence."
            },
            suggestedTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Five conceptual tags related to the work."
            }
          },
          required: ["summary", "suggestedPoetry", "suggestedTags"]
        }
      }
    });

    // Access the text property directly (getter).
    const text = response.text?.trim();
    if (!text) {
      console.warn("Gemini returned an empty response.");
      return null;
    }
    
    // Parse the JSON output from the model.
    return JSON.parse(text) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini AI enhancement failed:", error);
    return null;
  }
};
