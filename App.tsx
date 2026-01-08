
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ArtworkCard from './components/ArtworkCard';
import ArtworkModal from './components/ArtworkModal';
import { MOCK_ARTWORKS } from './constants';
import { Artwork, Category } from './types';

const App: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredArtworks = useMemo(() => {
    if (!filter) return MOCK_ARTWORKS;
    return MOCK_ARTWORKS.filter(art => art.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onFilterChange={setFilter} />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
          <button 
            onClick={() => setFilter(null)}
            className={`text-xs uppercase tracking-widest px-4 py-2 border-b-2 transition-all ${!filter ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            All Works
          </button>
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border-b-2 transition-all ${filter === cat ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Text (Desktop Only) */}
        {!filter && (
          <div className="hidden md:block mb-24 max-w-3xl">
            <h2 className="text-5xl lg:text-7xl font-serif italic text-gray-900 leading-tight">
              A curated collection of visual explorations, digital intersections, and spatial inquiries.
            </h2>
          </div>
        )}

        {/* Artwork Grid - Responsive Masonry style */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
          {filteredArtworks.map(artwork => (
            <ArtworkCard 
              key={artwork.id} 
              artwork={artwork} 
              onClick={setSelectedArtwork} 
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400 uppercase tracking-widest text-sm">No works found in this category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} ART ARCHIVE — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>

      {/* Modal View */}
      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </div>
  );
};

export default App;
