// src/components/GenreMovieList.tsx
import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { Movie } from './Movie';

const GenreMovieList: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const trendingResponse = await fetch('http://localhost:4000/api/movies/trending');
                const trendingData: Movie[] = await trendingResponse.json();
                setTrendingMovies(trendingData);

                const recommendationsResponse = await fetch('http://localhost:4000/api/movies/recommendations');
                const recommendationsData: Movie[] = await recommendationsResponse.json();
                setRecommendedMovies(recommendationsData);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold my-4">Trending Movies</h2>
            <MovieList movies={trendingMovies} />

            <h2 className="text-2xl font-bold my-4">Recommended Movies</h2>
            <MovieList movies={recommendedMovies} />
        </div>
    );
};

export default GenreMovieList;
