import { Artwork } from './types';

export const Category = {
  PAINTING: 'Painting',
  SCULPTURE: 'Sculpture',
  DIGITAL: 'Digital Art',
  PHOTOGRAPHY: 'Photography',
  INSTALLATION: 'Installation'
};

export const ARTWORKS: Artwork[] = [
  { 
    id: '1', 
    title: 'Whispers of the Void', 
    year: '2023', 
    category: Category.PAINTING, 
    medium: 'Oil on Canvas', 
    dimensions: '120 x 150 cm', 
    description: '도심의 풍경 속에 숨겨진 고요와 깊이감을 탐구한 작품입니다.', 
    imageUrl: 'https://picsum.photos/seed/art1/1200/1600', 
    tags: ['abstract', 'monochrome', 'urban'] 
  },
  { 
    id: '2', 
    title: 'Digital Resilience', 
    year: '2024', 
    category: Category.DIGITAL, 
    medium: 'Generative Art', 
    dimensions: 'Variable', 
    description: '생물학적 형태와 알고리즘 생성의 교차점을 조사합니다.', 
    imageUrl: 'https://picsum.photos/seed/art2/1600/1200', 
    tags: ['ai', 'future', 'organic'] 
  },
  { 
    id: '3', 
    title: 'Suspended Gravity', 
    year: '2022', 
    category: Category.SCULPTURE, 
    medium: 'Brushed Steel', 
    dimensions: '200 x 300 cm', 
    description: '무게감과 공기 사이의 긴장감을 포착합니다.', 
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
    description: '해안가의 여름날에 대한 향수를 담았습니다.', 
    imageUrl: 'https://picsum.photos/seed/art4/1600/1000', 
    tags: ['film', 'nostalgia', 'beach'] 
  },
  { 
    id: '5', 
    title: 'Ethereal Connection', 
    year: '2024', 
    category: Category.INSTALLATION, 
    medium: 'Light & Shadow', 
    dimensions: 'Room Scale', 
    description: '인간 관계를 탐구하는 몰입형 빛 설치 미술입니다.', 
    imageUrl: 'https://picsum.photos/seed/art5/1200/1800', 
    tags: ['immersive', 'light', 'experience'] 
  }
];