import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';


const apiUrl = import.meta.env.VITE_API_BASE_URL;


const Home = () => {
  interface Movie {
    id: number;
    title: string;
    isTrending: boolean;
   
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
      try {
        const response = await axios.get(`${apiUrl}/movies`);
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <SearchBar movies={movies} />

      <h2 className="text-white text-2xl font-bold mb-4">Trending Now</h2>
      <Carousel movies={movies.filter(movie => movie.isTrending)} />

      <h2 className="text-white text-2xl font-bold mb-4">Recommended for You</h2>
      <Carousel movies={movies.filter(movie => !movie.isTrending).slice(0, 10)} />
    </div>
  );
};

export default Home;
