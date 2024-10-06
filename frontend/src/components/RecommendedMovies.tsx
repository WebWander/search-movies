// src/components/RecommendedMovies.tsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getRecommendedMovies } from '../services/GetApi'; // Your Axios service

interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
}

const RecommendedMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const data = await getRecommendedMovies();
        setMovies(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error fetching recommended movies');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Slick slider settings
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 5, 
    slidesToScroll: 2, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-white text-2xl font-bold mb-4">Recommended Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie._id} className="px-2">
            <div className="group relative cursor-pointer">
              <img 
                src={movie.thumbnail} 
                alt={movie.title} 
                className="w-full h-auto rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="mt-2">
                <h3 className="text-white mt-2 text-lg">{movie.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedMovies;
