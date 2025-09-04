import React from 'react';
import { ChevronRight, Calendar, MapPin, Timer, User } from 'lucide-react';
import { ResearchItem, categories } from '../data/research-data';

interface ResearchCardProps {
  research: ResearchItem;
  onClick: (research: ResearchItem) => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ research, onClick }) => {
  const category = categories.find(cat => cat.id === research.category);
  
  return (
    <div 
      className="group bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10"
      onClick={() => onClick(research)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {category && <category.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />}
          <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-300">
            {category?.name}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
        {research.title}
      </h3>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
        {research.summary}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{research.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Timer className="w-3 h-3" />
            <span>{research.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{research.location}</span>
          </div>
        </div>
        
        {research.organism && (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span className="truncate">{research.organism}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {research.keywords.slice(0, 3).map((keyword) => (
          <span
            key={keyword}
            className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400"
          >
            {keyword}
          </span>
        ))}
        {research.keywords.length > 3 && (
          <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
            +{research.keywords.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default ResearchCard;