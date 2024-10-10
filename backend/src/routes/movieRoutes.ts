import { Router } from 'express';
import Movie from '../models/Movie';

const router = Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});


// Get trending movies
router.get('/trending', async (req, res) => {
  try {
    const trendingMovies = await Movie.find({ isTrending: true });
    res.json(trendingMovies);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});





// Get a movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});




export default router;
