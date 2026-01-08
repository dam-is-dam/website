
// types.ts - Core data structures for the Art Archive application
export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface AIAnalysisResult {
  summary: string;
  suggestedPoetry: string;
  suggestedTags: string[];
}
