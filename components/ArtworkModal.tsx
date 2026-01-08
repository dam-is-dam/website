
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white p-4 md:p-8 overflow-y-auto">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[70] p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:items-start pt-12">
        <div className="lg:w-3/5">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="w-full h-auto object-contain bg-gray-50 shadow-2xl rounded-sm"
          />
        </div>

        <div className="lg:w-2/5 space-y-8">
          <div>
            <h2 className="text-4xl font-serif italic mb-2">{artwork.title}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-6">
              <span>{artwork.year}</span>
              <span>{artwork.category}</span>
              <span>{artwork.medium}</span>
              <span>{artwork.dimensions}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Concept</h4>
            <p className="text-gray-700 leading-relaxed font-light">
              {enhancedData ? enhancedData.summary : artwork.description}
            </p>
          </div>

          {enhancedData?.suggestedPoetry && (
            <div className="p-6 bg-gray-50 rounded-sm italic font-serif text-gray-600 leading-loose border-l-2 border-gray-200">
              {enhancedData.suggestedPoetry.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {(enhancedData ? enhancedData.suggestedTags : artwork.tags).map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {!enhancedData && (
            <button 
              onClick={handleEnhance}
              disabled={isEnhancing}
              className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isEnhancing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI Enhancing...
                </>
              ) : "Enhance with Gemini AI"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
