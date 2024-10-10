// MovieCarousel.js
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';

interface MovieCarouselProps {
  genre: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ genre }) => {
  interface Movie {
    _id: string;
    thumbnail: string;
    title: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/movies/genre/${genre}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMoviesByGenre();
  }, [genre]);

  // Function to get unique movies from the array
  const getUniqueMovies = (moviesArray: Movie[], limit: number) => {
    const seen = new Set();
    const uniqueMovies: Movie[] = [];

    for (const movie of moviesArray) {
      if (!seen.has(movie._id) && uniqueMovies.length < limit) {
        uniqueMovies.push(movie);
        seen.add(movie._id); 
      }
    }

    return uniqueMovies;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Get unique movies (limit to 10)
  const uniqueMovies = getUniqueMovies(movies, 10);  

  return (
    <div className="movie-carousel py-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">{genre} Movies</h2>
      <Slider {...settings}>
        {uniqueMovies.map((movie) => (
          <div key={movie._id} className="movie p-4">
            <img
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-2"
              src={movie.thumbnail}
              alt={movie.title}
            />
            <h3 className="text-lg text-white text-center font-medium">{movie.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
