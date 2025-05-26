import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-card relative rounded-2xl overflow-hidden">
        <div className="flex items-center px-6 py-4">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tarihi olayları ara..."
            className="flex-1 ml-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              px-6 py-2 rounded-xl font-medium transition-all duration-200
              ${query.trim() 
                ? 'bg-white text-gray-900 hover:bg-gray-100' 
                : 'bg-white/10 text-white hover:bg-white/20'
              }
            `}
          >
            Ara
          </motion.button>
        </div>
      </div>
    </form>
  );
} 