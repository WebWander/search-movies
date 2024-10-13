import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieThumbnail from '../components/MovieThumbnail';



// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';


const Categories: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  interface Movie {
    _id: string;
    title: string;
    genre: string;
    
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all movies initially to extract unique genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://flex-movies.onrender.com/api/movies`); 
        const allMovies = response.data;

        // Extract unique genres from the movies
        const uniqueGenres = new Set<string>();
        allMovies.forEach((movie: Movie) => {
          movie.genre.split(', ').forEach((genre: string) => uniqueGenres.add(genre.trim()));
        });

        setGenres(Array.from(uniqueGenres));
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Failed to fetch genres. Please try again later.');
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies by selected genre
  useEffect(() => {
    if (selectedGenre) {
      setLoading(true);
      setError(null);
      const fetchMoviesByGenre = async () => {
        try {
          const response = await axios.get(`https://flex-movies.onrender.com/api/genres/genre/${selectedGenre}`);
          setMovies(response.data);
        } catch (err) {
          console.error('Error fetching movies by genre:', err);
          setError('Failed to fetch movies for this genre. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchMoviesByGenre();
    }
  }, [selectedGenre]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Categories</h2>

      {/* Render Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`cursor-pointer bg-gray-800 text-white rounded-lg p-4 text-center hover:bg-gray-700 transition duration-300 ${
              selectedGenre === genre ? 'bg-gray-700' : ''
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500">Loading movies...</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* Render Movies */}
      {selectedGenre && !loading && !error && (
        <div>
          <h3 className="text-white text-2xl font-bold mb-4">
            Movies in "{selectedGenre}"
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieThumbnail key={movie._id} movie={movie} />
              ))
            ) : (
              <p className="text-gray-500">No movies found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;