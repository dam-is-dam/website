
import React, { useState } from 'react';

interface NavbarProps {
  onFilterChange: (category: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onFilterChange(null)}>
            <h1 className="text-2xl font-serif font-semibold tracking-tight text-gray-900">
              ART<span className="text-gray-400 font-light ml-2">ARCHIVE</span>
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 text-sm font-medium uppercase tracking-widest text-gray-500">
            <button onClick={() => onFilterChange(null)} className="hover:text-black transition-colors">Works</button>
            <button className="hover:text-black transition-colors">Information</button>
            <button className="hover:text-black transition-colors">Contact</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-black p-2 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center">
            <button onClick={() => { onFilterChange(null); setIsOpen(false); }} className="block w-full px-3 py-4 text-base font-medium text-gray-900 border-b border-gray-50 uppercase tracking-widest">Works</button>
            <button onClick={() => setIsOpen(false)} className="block w-full px-3 py-4 text-base font-medium text-gray-900 border-b border-gray-50 uppercase tracking-widest">Information</button>
            <button onClick={() => setIsOpen(false)} className="block w-full px-3 py-4 text-base font-medium text-gray-900 uppercase tracking-widest">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
