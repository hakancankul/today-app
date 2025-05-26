import { useState, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-card flex items-center gap-2 p-2 sm:p-3 rounded-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ara..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none"
        />
        <button
          type="submit"
          className={`p-2 rounded-lg transition-all duration-200 ${
            query.trim()
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </form>
  );
} 