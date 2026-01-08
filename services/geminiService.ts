
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceArtworkDescription = async (
  title: string,
  medium: string,
  currentDescription: string
): Promise<AIAnalysisResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this artwork metadata. 
      Title: ${title}
      Medium: ${medium}
      Current Description: ${currentDescription}
      
      Please provide a more poetic summary, suggested tags, and a short piece of abstract poetry reflecting the piece.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestedTags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            suggestedPoetry: { type: Type.STRING }
          },
          required: ["summary", "suggestedTags"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as AIAnalysisResult;
    }
    return null;
  } catch (error) {
    console.error("AI Enhancement failed:", error);
    return null;
  }
};
