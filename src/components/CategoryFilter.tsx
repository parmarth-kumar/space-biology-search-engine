import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { categories } from '../data/research-data';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="relative inline-block">
      {/* Glassy Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 
        bg-gray-900/40 backdrop-blur-lg 
        border border-gray/20 
        rounded-xl 
        cursor-pointer 
        hover:bg-gray-900/60 
        transition-all shadow-md"
      >
        <Filter className="w-4 h-4 text-gray-300" />
        <span className="text-sm font-medium text-white">
          {selectedCategoryData?.name || 'All Research'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Glassy Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-52 
          bg-gray-900/40 
          backdrop-blur-lg 
          border border-gray/20 
          rounded-xl 
          shadow-xl 
          z-50"
        >
          <div className="p-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsOpen(false); // close dropdown
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-all ${
                  selectedCategory === category.id
                    ? 'bg-cyan-500/20 text-cyan-300 shadow-inner border border-cyan-400/30'
                    : 'hover:bg-gray/10 text-gray-200 hover:text-white'
                }`}
              >
                <category.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
