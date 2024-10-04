import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styles

const TrendingMovies = () => {
  interface Movie {
    _id: string;
    imageUrl: string;
    title: string;
    thumbnail: string;
  }

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies/trending'); 
        if (!response.ok) {
          throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        setTrendingMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return <p>Loading trending movies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} className="w-full">
        {trendingMovies.map((movie) => (
          <div key={movie._id} className="relative">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="min-w-full md:h-[310px] object-cover
              object-left-top mr-5 rounded-md hover:border-[4px]
              border-gray-400 transition-all duration-100 ease-in-out" 
            />
            <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-2 rounded-b-lg text-lg">
              {movie.title}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingMovies;
