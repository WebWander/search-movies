// src/components/MovieList.tsx
import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from './Movie';

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className="flex overflow-x-auto space-x-4 py-4">
            {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
