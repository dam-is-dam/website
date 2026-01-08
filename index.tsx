import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, Type } from "@google/genai";

// --- Models & Data ---
const Category = {
  PAINTING: 'Painting',
  SCULPTURE: 'Sculpture',
  DIGITAL: 'Digital Art',
  PHOTOGRAPHY: 'Photography',
  INSTALLATION: 'Installation'
};

const ARTWORKS = [
  { id: '1', title: 'Whispers of the Void', year: '2023', category: Category.PAINTING, medium: 'Oil on Canvas', dimensions: '120 x 150 cm', description: '도심의 풍경 속에 숨겨진 고요와 깊이감을 탐구한 작품입니다.', imageUrl: 'https://picsum.photos/seed/art1/1200/1600', tags: ['abstract', 'monochrome', 'urban'] },
  { id: '2', title: 'Digital Resilience', year: '2024', category: Category.DIGITAL, medium: 'Generative Art', dimensions: 'Variable', description: '생물학적 형태와 알고리즘 생성의 교차점을 조사합니다.', imageUrl: 'https://picsum.photos/seed/art2/1600/1200', tags: ['ai', 'future', 'organic'] },
  { id: '3', title: 'Suspended Gravity', year: '2022', category: Category.SCULPTURE, medium: 'Brushed Steel', dimensions: '200 x 300 cm', description: '무게감과 공기 사이의 긴장감을 포착합니다.', imageUrl: 'https://picsum.photos/seed/art3/1200/1200', tags: ['metal', 'modern', 'dynamic'] },
  { id: '4', title: 'Golden Hour Memories', year: '2023', category: Category.PHOTOGRAPHY, medium: '35mm Film', dimensions: 'A3 Print', description: '해안가의 여름날에 대한 향수를 담았습니다.', imageUrl: 'https://picsum.photos/seed/art4/1600/1000', tags: ['film', 'nostalgia', 'beach'] },
  { id: '5', title: 'Ethereal Connection', year: '2024', category: Category.INSTALLATION, medium: 'Light & Shadow', dimensions: 'Room Scale', description: '인간 관계를 탐구하는 몰입형 빛 설치 미술입니다.', imageUrl: 'https://picsum.photos/seed/art5/1200/1800', tags: ['immersive', 'light', 'experience'] }
];

// --- AI Service ---
const enhanceArtwork = async (artwork: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `예술 작품 정보를 바탕으로 더 시적인 설명과 태그를 한국어로 생성해줘.
      제목: ${artwork.title}, 매체: ${artwork.medium}, 기존 설명: ${artwork.description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            poetry: { type: Type.STRING }
          },
          required: ["summary", "suggestedTags", "poetry"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI Enhancement Error:", e);
    return null;
  }
};

// --- Components ---

const Navbar = ({ onFilterChange, currentFilter }: { onFilterChange: (f: string | null) => void, currentFilter: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => onFilterChange(null)}>
          <h1 className="text-xl font-serif font-bold tracking-tighter">ART<span className="text-gray-400 font-light ml-1">ARCHIVE</span></h1>
        </div>
        
        <div className="hidden md:flex space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium text-gray-500">
          <button onClick={() => onFilterChange(null)} className={`hover:text-black transition-colors ${!currentFilter ? 'text-black border-b border-black' : ''}`}>Works</button>
          <button className="hover:text-black transition-colors">Information</button>
          <button className="hover:text-black transition-colors">Contact</button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-500">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-8 space-y-6 flex flex-col items-center animate-fade-in text-[12px] uppercase tracking-[0.2em]">
          <button onClick={() => { onFilterChange(null); setIsOpen(false); }}>Works</button>
          <button>Information</button>
          <button>Contact</button>
        </div>
      )}
    </nav>
  );
};

const ArtworkModal = ({ artwork, onClose }: { artwork: any, onClose: () => void }) => {
  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    setLoading(true);
    const data = await enhanceArtwork(artwork);
    if (data) setAiData(data);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fade-in">
      <button onClick={onClose} className="fixed top-6 right-6 z-[110] bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <img src={artwork.imageUrl} className="w-full h-auto shadow-sm bg-gray-50 rounded-sm" alt={artwork.title} />
        </div>
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">{artwork.title}</h2>
            <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100 pb-6">
              <span>{artwork.year}</span>
              <span>{artwork.category}</span>
              <span>{artwork.medium}</span>
              <span>{artwork.dimensions}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">About the work</h4>
            <p className="text-gray-600 leading-relaxed font-light text-lg">
              {aiData ? aiData.summary : artwork.description}
            </p>
          </div>

          {aiData?.poetry && (
            <div className="p-8 bg-gray-50 border-l-2 border-gray-200 italic font-serif text-gray-500 leading-loose">
              {aiData.poetry.split('\n').map((l: string, i: number) => <p key={i}>{l}</p>)}
            </div>
          )}

          {!aiData && (
            <button 
              onClick={handleAI} 
              disabled={loading}
              className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all disabled:bg-gray-200 flex justify-center items-center gap-2"
            >
              {loading ? 'Analysing with Gemini...' : 'Enhance with Gemini AI'}
            </button>
          )}

          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-3">Concepts</p>
            <div className="flex flex-wrap gap-2">
              {(aiData ? aiData.suggestedTags : artwork.tags).map((t: string) => (
                <span key={t} className="px-3 py-1 bg-gray-100 text-[9px] uppercase tracking-wider text-gray-500 rounded-full">#{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const filtered = useMemo(() => 
    filter ? ARTWORKS.filter(a => a.category === filter) : ARTWORKS
  , [filter]);

  return (
    <div className="min-h-screen">
      <Navbar onFilterChange={setFilter} currentFilter={filter} />
      
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-20 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-serif italic mb-10 leading-tight">Archiving the <br/>Invisible Flow.</h2>
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-bold">
            <button onClick={() => setFilter(null)} className={`pb-1 border-b-2 transition-all ${!filter ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-400'}`}>All Works</button>
            {Object.values(Category).map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`pb-1 border-b-2 transition-all ${filter === c ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-400'}`}>{c}</button>
            ))}
          </div>
        </header>

        <div className="masonry-grid">
          {filtered.map(art => (
            <div key={art.id} onClick={() => setSelected(art)} className="artwork-item group cursor-pointer animate-fade-in">
              <div className="relative overflow-hidden bg-gray-50 rounded-sm">
                <img src={art.imageUrl} className="w-full h-auto transform transition-transform duration-1000 group-hover:scale-105" alt={art.title} loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>
              <div className="mt-6 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif italic text-xl text-gray-900">{art.title}</h4>
                  <span className="text-[10px] text-gray-300 font-bold">{art.year}</span>
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">{art.category} — {art.medium}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-bold italic">© ART ARCHIVE PORTFOLIO {new Date().getFullYear()}</p>
      </footer>

      {selected && <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}