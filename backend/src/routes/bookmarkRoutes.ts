import { Router, Request, Response } from 'express';
import express from 'express';
import Bookmark from '../models/Bookmark';
import Movie from '../models/Movie';
const router = Router();

// GET all bookmarked movies for the user
router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().populate('movie');
    const bookmarkedMovies = bookmarks.map(bookmark => bookmark.movie);
    res.json(bookmarkedMovies);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

router.get('/check/:id', async (req: Request, res: Response) => {
  const movieId = req.params.id;

  try {
    const isBookmarked = await Bookmark.exists({ movie: movieId });
    res.json({ isBookmarked: !!isBookmarked });
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    res.status(500).json({ error: 'Failed to check bookmark status' });
  }
});

// POST to add a movie to bookmarks
router.post('/add', (async (req: Request, res: Response) => {
  const { movie } = req.body;

  if (!movie) {
    console.error('No movie ID provided');
    return res.status(400).json({ error: 'movie ID is required' });
  }

  try {
    // Use findOneAndUpdate with upsert: true to avoid duplicates
    const bookmark = await Bookmark.findOneAndUpdate(
      { movie },
      { $setOnInsert: { movie } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: 'Movie bookmarked successfully', bookmark });
  } catch (error) {
    console.error('Error bookmarking movie:', error);
    res.status(500).json({ error: 'Failed to bookmark movie' });
  }
}) as unknown as Router);

// POST to remove a movie from bookmarks
router.post('/remove', (async (req: Request, res: Response) => {
  const { movie } = req.body;

  if (!movie) {
    return res.status(400).json({ error: 'movie ID is required to remove bookmark' });
  }

  try {
    const bookmark = await Bookmark.findOneAndDelete({ movie });
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
}) as unknown as Router);

export default router;