
import React from 'react';
import { Artwork } from '../types';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
  return (
    <div 
      onClick={() => onClick(artwork)}
      className="group cursor-pointer mb-8 break-inside-avoid animate-fade-in"
    >
      <div className="relative overflow-hidden bg-gray-100 rounded-sm">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-serif italic text-gray-900">{artwork.title}</h3>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-tighter">{artwork.year}</span>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-widest">{artwork.category} — {artwork.medium}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
