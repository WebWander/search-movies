import { Link } from 'react-router-dom';

const MovieThumbnail = ({ movie }: { movie: any }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
      <Link to={`/movie/${movie._id}`}>
        <img src={movie.thumbnail} alt={movie.title} className="w-full h-60 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieThumbnail;
