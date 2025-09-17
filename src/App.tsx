import { useState, useMemo, useEffect } from 'react';
import { Search, Microscope } from 'lucide-react';
import { ResearchItem, categories } from './data/research-data';
import aiGeneratedData from './data/ai-generated-data.json';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ResearchCard from './components/ResearchCard';
import ResearchModal from './components/ResearchModal';
import StarField from './components/StarField';

function App() {
  const [allResearchData, setAllResearchData] = useState<ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);

  useEffect(() => {
    setAllResearchData(aiGeneratedData as ResearchItem[]);
    setIsLoading(false);
  }, []);

  const filteredResearch = useMemo(() => {
    return allResearchData.filter(item => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = (item.title && item.title.toLowerCase().includes(lowerSearchTerm)) ||
                          (item.summary && item.summary.toLowerCase().includes(lowerSearchTerm)) ||
                          (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm)));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allResearchData]);

  const categoryStats = useMemo(() => {
    return categories
      .filter(category => category.id !== 'all')
      .map(category => ({
        ...category,
        count: allResearchData.filter(item => item.category === category.id).length
      }));
  }, [allResearchData]);

  return (
    <div className="min-h-screen text-slate-100 relative overflow-x-hidden">
    {/* <div className="min-h-screen text-white relative overflow-x-hidden"> */}
      <StarField />
      
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center"> */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Space Biology Knowledge Engine
                </h1>
                <p className="text-xs text-gray-400">Explore NASA's Biology Research - Powered by AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-400 bg-clip-text text-transparent md:leading-snug">
                Explore Space Biology Research
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Search, analyze, and visualize decades of NASA's space biology data. Discover how life adapts to microgravity, cosmic radiation, and beyond.
              </p>
            </div>
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultCount={filteredResearch.length}
            />
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-gray-400">Popular searches:</span>
              {['astronaut', 'stem cells', 'plant growth', 'radiation', 'microgravity'].map((term) => (
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

        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              {categoryStats.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500/10 border-cyan-400/50 shadow-cyan-500/20'
                      : 'bg-slate-900/50 border-slate-800 hover:border-gray-700/50 hover:bg-gray-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <category.icon className={`w-8 h-8 transition-colors ${
                      selectedCategory === category.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs font-medium text-gray-300">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="font-semibold text-left mb-2 group-hover:text-white transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 text-left line-clamp-2">
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'AI-Powered Research Insights'}
              </h2>
              <div className="text-sm text-gray-400">
                {filteredResearch.length} {filteredResearch.length === 1 ? 'result' : 'results'}
              </div>
            </div>
            {isLoading ? (
              <div className="text-center py-16 text-gray-400">Loading AI-Enriched Data...</div>
            ) : filteredResearch.length === 0 ? (
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
      </main>
      
      <footer className="relative z-10 border-t border-gray-800/50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Space Biology Knowledge Engine | Built for the NASA Space Apps Challenge.</p>
          <p className="mt-2">
            Data sourced from <a href="https://github.com/jgalazka/SB_publications" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NASA GeneLab</a> and enriched with AI.
          </p>
        </div>
      </footer>

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