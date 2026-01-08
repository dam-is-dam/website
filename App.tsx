import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ArtworkCard from './components/ArtworkCard';
import ArtworkModal from './components/ArtworkModal';
import { ARTWORKS, Category } from './constants';
import { Artwork } from './types';

const App: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredArtworks = useMemo(() => {
    if (!filter) return ARTWORKS;
    return ARTWORKS.filter(art => art.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onFilterChange={setFilter} />
      
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-20 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">
            Archiving the <br/>Invisible Flow.
          </h2>
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-bold">
            <button 
              onClick={() => setFilter(null)} 
              className={`pb-1 border-b-2 transition-all ${!filter ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-400'}`}
            >
              All
            </button>
            {Object.values(Category).map(c => (
              <button 
                key={c} 
                onClick={() => setFilter(c)} 
                className={`pb-1 border-b-2 transition-all ${filter === c ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-400'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </header>

        {/* Masonry-style grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredArtworks.map(artwork => (
            <ArtworkCard 
              key={artwork.id} 
              artwork={artwork} 
              onClick={setSelectedArtwork} 
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 uppercase tracking-widest text-sm">No works found in this category.</p>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-bold italic">
          © ART ARCHIVE PORTFOLIO {new Date().getFullYear()}
        </p>
      </footer>

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