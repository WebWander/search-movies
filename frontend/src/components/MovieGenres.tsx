// App.js
import React, { useState } from 'react';
import MovieCarousel from './MovieCarousel';

const MovieGenres: React.FC = () => {
  const [shownMovieIds, setShownMovieIds] = useState<Set<string>>(new Set());

  const genres = ["Action", "Crime", "Adventure"]; // Example genres

  return (
    <div className="App">
      {genres.map((genre) => (
        <MovieCarousel
          key={genre}
          genre={genre}
          shownMovieIds={shownMovieIds}
          setShownMovieIds={setShownMovieIds}
        />
      ))}
    </div>
  );
};

export default MovieGenres;
