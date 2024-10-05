// src/components/MovieCard.tsx
import React from 'react';
import { Movie } from './Movie';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="flex flex-col items-center p-2">
            <img 
                src={movie.thumbnail} 
                alt={movie.title} 
                className="w-40 h-60 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-center text-sm font-semibold">{movie.title}</h3>
        </div>
    );
};

export default MovieCard;
