import { Router, Request, Response } from 'express';
import Movie from '../models/Movie'; 

const router = Router();

// Get movies by genre
router.get('/genre/:genre', async (req: Request, res: Response): Promise<void> => {
  console.log(`Received request for genre: ${req.params.genre}`);
  try {
    const genre = req.params.genre.toLowerCase(); 
    const filteredMovies = await Movie.find({
      genre: { $regex: new RegExp(`\\b${genre}\\b`, 'i') } 
    });

    // If no movies found, return a 404 status
    if (filteredMovies.length === 0) {
      res.status(404).json({ message: "No movies found for this genre." });
      return; 
    }

    // Respond with the filtered movies
    res.json(filteredMovies);
  } catch (error) {
    console.error('Error occurred while fetching movies by genre:', error);
    res.status(500).json({ message: "An error occurred while fetching movies." });
  }
});

export default router;
