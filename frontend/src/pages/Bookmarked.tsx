import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieThumbnail from '../components/MovieThumbnail';


interface Movie {
  _id: string;
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  isTrending: boolean;
}

const apiUrl = 'https://flex-movies.onrender.com'
const Bookmarked: React.FC = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/bookmarks`);
        setBookmarkedMovies(response.data);
      } catch (err) {
        console.error('Error fetching bookmarked movies:', err);
        setError('Failed to load bookmarked movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedMovies();
  }, []);

  const removeBookmark = async (movieId: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/bookmarks/remove`, { movie: movieId });
      if (response.status === 200) {
        setBookmarkedMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
      } else {
        setError('Failed to remove bookmark. Please try again.');
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
      setError('Failed to remove bookmark. Please try again.');
    }
  };
  



  if (loading) {
    return <p className="text-center text-gray-500">Loading bookmarked movies...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Bookmarked Movies</h2>

      {bookmarkedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bookmarkedMovies
            .filter((movie) => movie && movie._id) // filter out null or undefined movies
            .map((movie) => (
              <div key={movie._id}>
                <MovieThumbnail movie={movie} />
                <button
                  onClick={() => removeBookmark(movie._id)}
                  className="mt-2 w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition duration-300"
                >
                  Remove Bookmark
                </button>
              </div>
            ))}
        </div>
) : (
  <p className="text-center text-gray-500">You have no bookmarked movies.</p>
)}

    </div>
  );
};

export default Bookmarked;