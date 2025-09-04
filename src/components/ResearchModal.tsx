import React from 'react';
import { X, Calendar, MapPin, Timer, User, Lightbulb, Target, Link, ChevronRight, Sparkles } from 'lucide-react';
import { ResearchItem, categories } from '../data/research-data';

interface ResearchModalProps {
  research: ResearchItem;
  onClose: () => void;
}

const ResearchModal: React.FC<ResearchModalProps> = ({ research, onClose }) => {
  const category = categories.find(cat => cat.id === research.category);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur border border-gray-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-800/50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <div className="flex items-center space-x-2 mb-3">
                {category && <category.icon className="w-5 h-5 text-blue-400" />}
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300">
                  {category?.name}
                </span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-400">
                  {research.year}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">{research.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Timer className="w-4 h-4" />
                  <span>{research.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{research.location}</span>
                </div>
                {research.organism && (
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{research.organism}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* AI Summary Section */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-blue-300">AI Research Summary</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">{research.summary}</p>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
              <h3 className="text-sm font-medium text-white mb-2">Experiment Details</h3>
              <p className="text-gray-400 text-sm"><strong>Study:</strong> {research.experiment}</p>
              <p className="text-gray-400 text-sm"><strong>Methodology:</strong> {research.methodology}</p>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Key Findings</h2>
            </div>
            <div className="space-y-3">
              {research.findings.map((finding, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-800/50">
                  <div className="w-6 h-6 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Implications */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Research Implications</h2>
            </div>
            <div className="space-y-3">
              {research.implications.map((implication, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300 leading-relaxed">{implication}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Research Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {research.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300 hover:bg-gray-800/70 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Related Studies */}
          {research.relatedStudies.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Related Studies</h2>
              </div>
              <div className="space-y-2">
                {research.relatedStudies.map((study, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{study}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchModal;