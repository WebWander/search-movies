import { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieView from './pages/MovieView';
import Categories from './pages/Categories';
import Bookmarked from './pages/Bookmarked';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="bg-gray-900 p-4 text-white flex justify-between items-center w-full shadow-md z-30 relative">
        <div className="flex items-center w-full max-w-screen-lg mx-auto">
          <Link to="/" className="text-xl font-bold md:text-2xl">Movieflex</Link>

          <div className="ml-auto md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>

          <div
            className={`flex-col md:flex md:flex-row md:gap-6 md:ml-auto md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-transform transform ${
              isMenuOpen ? 'flex z-30' : 'hidden'
            } md:flex`}
          >
            <Link
              to="/"
              className="block px-4 py-2 text-center text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-400 transition duration-300 md:inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="block px-4 py-2 text-center text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-400 transition duration-300 md:inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/bookmarked"
              className="block px-4 py-2 text-center text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-400 transition duration-300 md:inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookmarked
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="/movie/:id" element={<MovieView />} />
          {/* Redirect all unknown paths to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;