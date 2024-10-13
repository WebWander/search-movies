import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoutes from './src/routes/movieRoutes'; 
import genreRoutes from './src/routes/genreRoutes';
import bookmarkRoutes from './src/routes/bookmarkRoutes'
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  'https://search-movies-1.onrender.com', // Frontend URL on Render
  'https://search-movies-8a15.onrender.com', // Backend URL on Render
  'http://localhost:5173', // Local Vite frontend
  'http://localhost:3000' // Local Node Express backend
];


app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());




// Routes
app.use('/api/genres', genreRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Root route handler for GET requests to '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API'); // Customize this message as needed
});


mongoose
.connect(process.env.MONGO_URI || '')
.then(() => console.log("DB Connection Successful!"))
.catch((err: unknown) => console.error("DB Connection Error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
