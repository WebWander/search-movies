import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getTrendingMovies } from '../services/GetApi'; 

interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
  genre: string;
}

const TrendingCarousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error fetching trending movies');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">{error}</div>;

  // Slider settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the slides
    speed: 500, // Transition speed
    slidesToShow: 5, // Show 5 slides at a time
    slidesToScroll: 1, // Scroll by 1 slide per action
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="trending-movies-container p-6">
      <h2 className="text-white text-2xl font-bold mb-4">Trending Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item px-2">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <h3 className="text-white mt-2 text-lg">{movie.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingCarousel;
