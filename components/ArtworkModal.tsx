import React, { useState } from 'react';
import { Artwork, AIAnalysisResult } from '../types';
import { enhanceArtworkDescription } from '../services/geminiService';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedData, setEnhancedData] = useState<AIAnalysisResult | null>(null);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    const result = await enhanceArtworkDescription(artwork.title, artwork.medium, artwork.description);
    if (result) {
      setEnhancedData(result);
    }
    setIsEnhancing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fade-in">
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <img 
            src={artwork.imageUrl} 
            className="w-full h-auto shadow-sm bg-gray-50" 
            alt={artwork.title} 
          />
        </div>
        
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">{artwork.title}</h2>
            <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100 pb-6">
              <span>{artwork.year}</span>
              <span>{artwork.category}</span>
              <span>{artwork.medium}</span>
              {artwork.dimensions && <span>{artwork.dimensions}</span>}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">About this work</h4>
            <p className="text-gray-600 leading-relaxed font-light text-lg">
              {enhancedData ? enhancedData.summary : artwork.description}
            </p>
          </div>

          {enhancedData?.suggestedPoetry && (
            <div className="p-8 bg-gray-50 border-l border-gray-200 italic font-serif text-gray-500 leading-loose">
              {enhancedData.suggestedPoetry.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}

          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {(enhancedData ? enhancedData.suggestedTags : artwork.tags).map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-[9px] uppercase tracking-wider text-gray-500 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {!enhancedData && (
            <button 
              onClick={handleEnhance} 
              disabled={isEnhancing}
              className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all disabled:bg-gray-200 flex justify-center items-center gap-2"
            >
              {isEnhancing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analysing...
                </>
              ) : 'Enhance with Gemini AI'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;