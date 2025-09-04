import React, { useState, useMemo } from 'react';
import { Search, Filter, Zap, Microscope, Radiation, Leaf, Heart, Globe, ChevronRight, X, ExternalLink } from 'lucide-react';
import { researchData, ResearchItem, categories } from './data/research-data';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ResearchCard from './components/ResearchCard';
import ResearchModal from './components/ResearchModal';
import StarField from './components/StarField';

// import CategoryChart from "./components/CategoryChart"; // add this import at the top

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);

  const filteredResearch = useMemo(() => {
    return researchData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoryStats = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: researchData.filter(item => item.category === category.id).length
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <StarField />
      
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Space Biology Knowledge Engine
                </h1>
                <p className="text-xs text-gray-400">Explore NASA's Biology Research - Powered by AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                ZeN-1
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-400 bg-clip-text text-transparent">
              Explore Space Biology Research
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Search, analyze, and visualize decades of NASA's space biology data. Discover how life adapts to microgravity, cosmic radiation, extreme space conditions, and beyond.
            </p>
          </div>

          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={filteredResearch.length}
          />
          <div className="my-8">
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="text-gray-400">Popular searches:</span>
            {['Space medicine', 'Stem cells', 'Tissue engineering', 'Plant growth', 'Radiation effects', 'Microgravity'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-gray-300 hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {categoryStats.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border transition-all duration-300 group ${
                  selectedCategory === category.id
                    ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 hover:bg-gray-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <category.icon className={`w-8 h-8 transition-colors ${
                    selectedCategory === category.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs font-medium text-gray-300">
                    {category.count}
                  </span>
                </div>
                <h3 className="font-semibold text-left mb-2 group-hover:text-white transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400 text-left">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Results */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Insights from NASA Space Biology'}
            </h2>
            <div className="text-sm text-gray-400">
              {filteredResearch.length} {filteredResearch.length === 1 ? 'result' : 'results'}
            </div>
          </div>

          {filteredResearch.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResearch.map((item) => (
                <ResearchCard
                  key={item.id}
                  research={item}
                  onClick={setSelectedResearch}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* <CategoryChart research={researchData} /> */}
      

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Space Biology Engine</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                A comprehensive platform for exploring NASA's space biology research. 
                Built for the NASA Hackathon to make scientific discoveries more accessible.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">NASA Biology Archives</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Space Station Data</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">NASA Hackathon</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2025 Space Biology Knowledge Engine | Built with 🩶 for the NASA Space Apps Hackathon.
          </div>
        </div>
      </footer>

      {/* Research Detail Modal */}
      {selectedResearch && (
        <ResearchModal
          research={selectedResearch}
          onClose={() => setSelectedResearch(null)}
        />
      )}
    </div>
  );
}

export default App;