
export enum Category {
  PAINTING = 'Painting',
  SCULPTURE = 'Sculpture',
  DIGITAL = 'Digital Art',
  PHOTOGRAPHY = 'Photography',
  INSTALLATION = 'Installation'
}

export interface Artwork {
  id: string;
  title: string;
  year: string;
  category: Category;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface AIAnalysisResult {
  summary: string;
  suggestedTags: string[];
  suggestedPoetry?: string;
}
