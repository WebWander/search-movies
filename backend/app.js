import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './movieSchema.js';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://localhost:5173' // Only allow requests from this origin
  }));
app.use(express.json());


// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
      const movies = await Movie.find();
      res.json(movies);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.get('/api/movies/trending', async (req, res) => {
  console.log('Received request for trending movie'); // Debug log
  try {
      const trendingMovie = await Movie.find({ isTrending: true });
      console.log('Trending Movie:', trendingMovie); // Debug log
      if (trendingMovie) {
          res.json(trendingMovie);
      } else {
          console.log('No trending movie found'); // Debug log
          res.status(404).json({ message: 'No trending movie found.' });
      }
  } catch (err) {
      console.error('Error fetching trending movie:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});



// Get recommended movies
app.get('/api/movies/recommendations', async (req, res) => {
  try {
    // Step 1: Fetch trending movies
    const trendingMovies = await Movie.find({ isTrending: true });
    console.log('Trending Movies:', trendingMovies); // Debug log

    // Step 2: Fetch all movies
    const allMovies = await Movie.find();
    console.log('All Movies:', allMovies); // Debug log

    // Step 3: Filter out trending movies from all movies
    const nonTrendingMovies = allMovies.filter(movie => 
      !trendingMovies.some(trendingMovie => trendingMovie._id.equals(movie._id))
    );

    // Step 4: Randomly select a specified number of movies
    const numberOfRecommendations = 5; // Set the number of recommended movies
    const recommendedMovies = getRandomMovies(nonTrendingMovies, numberOfRecommendations);

    // Step 5: Return the selected movies
    if (recommendedMovies.length === 0) {
      return res.status(404).json({ message: "No recommendations available." });
    }

    res.json(recommendedMovies);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Function to get random movies from an array
function getRandomMovies(moviesArray, num) {
  // Shuffle the array and return the first 'num' movies
  const shuffled = moviesArray.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}



// Get movies by genre
app.get('/api/movies/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre.toLowerCase(); // Normalize to lower case for consistent comparison
    const movies = await Movie.find();

    // Filter movies to match the specified genre exactly
    const filteredMovies = movies.filter(movie => 
      movie.genre.toLowerCase().split(', ').includes(genre) // Split genres and check if includes the specified genre
    );

    if (filteredMovies.length === 0) {
      return res.status(404).json({ message: "No movies found for this genre." });
    }

    res.json(filteredMovies);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while fetching movies." });
  }
});


app.get('/api/movies/genres', async (req, res) => {
  try {
    // Fetch movies from the database
    const movies = await Movie.find(); // Ensure Movie is properly defined

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }

    // Get all genres by splitting the genre strings
    const genres = movies.flatMap(movie => movie.genre.split(', '));

    // Remove duplicates by converting the array to a Set and then back to an array
    const uniqueGenres = [...new Set(genres.map(genre => genre.toLowerCase()))];

    if (uniqueGenres.length === 0) {
      return res.status(404).json({ message: "No genres found." });
    }

    res.json(uniqueGenres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "An error occurred while fetching genres." });
  }
});


app.get('/api/movies/:id', async (req, res) => {
  try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
  } catch (error) {
      console.error('Error fetching movie by ID:', error);
      res.status(500).json({ message: error.message });
  }
});













mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connection Successful!"))
.catch((err) => console.error("DB Connection Error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
