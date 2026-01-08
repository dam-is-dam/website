
import { Category, Artwork } from './types';

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Whispers of the Void',
    year: '2023',
    category: Category.PAINTING,
    medium: 'Oil on Canvas',
    dimensions: '120 x 150 cm',
    description: 'An exploration of silence and depth in urban landscapes.',
    imageUrl: 'https://picsum.photos/seed/art1/1200/1600',
    tags: ['abstract', 'monochrome', 'urban']
  },
  {
    id: '2',
    title: 'Digital Resilience',
    year: '2024',
    category: Category.DIGITAL,
    medium: 'Generative Adversarial Network',
    dimensions: 'Variable',
    description: 'Investigating the intersection of biological forms and algorithmic generation.',
    imageUrl: 'https://picsum.photos/seed/art2/1600/1200',
    tags: ['ai', 'future', 'organic']
  },
  {
    id: '3',
    title: 'Suspended Gravity',
    year: '2022',
    category: Category.SCULPTURE,
    medium: 'Brushed Steel and Wire',
    dimensions: '200 x 200 x 300 cm',
    description: 'Capturing the tension between weight and airiness.',
    imageUrl: 'https://picsum.photos/seed/art3/1200/1200',
    tags: ['metal', 'modern', 'dynamic']
  },
  {
    id: '4',
    title: 'Golden Hour Memories',
    year: '2023',
    category: Category.PHOTOGRAPHY,
    medium: '35mm Film',
    dimensions: 'A3 Print',
    description: 'A nostalgic look at coastal summer days.',
    imageUrl: 'https://picsum.photos/seed/art4/1600/1000',
    tags: ['film', 'nostalgia', 'beach']
  },
  {
    id: '5',
    title: 'Ethereal Connection',
    year: '2024',
    category: Category.INSTALLATION,
    medium: 'Light and Shadow',
    dimensions: 'Room Scale',
    description: 'Immersive light installation exploring human connection.',
    imageUrl: 'https://picsum.photos/seed/art5/1200/1800',
    tags: ['immersive', 'light', 'experience']
  }
];
