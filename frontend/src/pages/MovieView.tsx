import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';



interface Movie {
  _id: string;
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
}


const MovieView = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };
  
    const checkBookmarkStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/bookmarks/check/${id}`);
        setIsBookmarked(response.data.isBookmarked);
      } catch (err) {
        console.error('Error checking bookmark status:', err);
      }
    };
  
    fetchMovieDetails();
    checkBookmarkStatus();
  }, [id]);

  const toggleBookmark = async () => {
    if (!movie || !movie._id) {
      console.error('Movie ID is missing');
      setError('Movie ID is missing. Unable to update bookmark.');
      return;
    }
  
    try {
      const response = isBookmarked 
        ? await axios.post(`http://localhost:3000/api/bookmarks/remove`, { movie: movie._id }) 
        : await axios.post(`http://localhost:3000/api/bookmarks/add`, { movie: movie._id });
      
      if (response.status === 201 || response.status === 200) {
        setIsBookmarked(!isBookmarked); // Toggle state based on removal success
      } else {
        setError('Failed to update bookmark. Please try again.');
      }
    } catch (err) {
      console.error('Error updating bookmark:', err);
      setError('Failed to update bookmark. Please try again.');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      {movie ? (
        <div className="bg-gray-800 rounded-lg p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/path/to/placeholder.jpg';
              }}
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-400 mb-4">{movie.genre}</p>
              <p className="mb-4">{movie.synopsis}</p>
              <p className="mb-4"><strong>Release Date:</strong> {movie.year}</p>
              <p className="mb-4"><strong>Rating:</strong> {movie.rating}</p>
              <p className="mb-4"><strong>Cast:</strong> {movie.actors.join(', ')}</p>

              {/* Toggle Bookmark Button */}
              <button
                onClick={toggleBookmark}
                className={`flex items-center text-lg px-4 py-2 ${
                  isBookmarked ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
                } rounded transition duration-300`}
              >
                {isBookmarked ? <AiFillStar className="mr-2" /> : <AiOutlineStar className="mr-2" />}
                {isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Movie not found.</p>
      )}
    </div>
  );
};

export default MovieView;
