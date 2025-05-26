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
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-white shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ara..."
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none px-2"
        />
        <button
          type="submit"
          className={`p-1.5 rounded-md transition-all duration-200 ${
            query.trim()
              ? 'bg-gray-900 text-white hover:bg-black'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
} 