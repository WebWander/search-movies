import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  movies: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({ movies }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const fuse = new Fuse(movies, {
    keys: ['title'],
    threshold: 0.3, 
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setQuery(input);

    if (input.trim() === '') {
      setResults([]);
    } else {
      const searchResults = fuse.search(input).map(result => result.item);
      setResults(searchResults);
    }
  };

  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3 mx-auto mb-8 z-20"> 
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a movie..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-20 max-h-64 overflow-y-auto shadow-lg">
          {results.map((movie, index) => (
            <Link
              to={`/movie/${movie._id}`}
              key={index}
              className="block px-4 py-2 hover:bg-gray-100 transition"
            >
              {movie.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
