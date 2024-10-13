import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import movieRoutes from './src/routes/movieRoutes'; 
import genreRoutes from './src/routes/genreRoutes';
import bookmarkRoutes from './src/routes/bookmarkRoutes'
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://movieflex1.netlify.app', // replace with your Netlify domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed methods if needed
  credentials: true // if your API uses cookies or HTTP authentication
};

app.use(cors(corsOptions));


app.use(express.json());




// Routes
app.use('/api/genres', genreRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

const distPath = path.resolve(__dirname, 'dist');
console.log(`Serving static files from: ${distPath}`);
app.use(express.static(distPath));

// Catch-all route to serve the frontend's index.html on unmatched routes
app.get('*', (req, res) => {
  const indexPath = path.resolve(distPath, 'index.html');
  console.log(`Attempting to serve file: ${indexPath}`);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(404).send("File not found.");
    }
  });
});


mongoose
.connect(process.env.MONGO_URI || '')
.then(() => console.log("DB Connection Successful!"))
.catch((err: unknown) => console.error("DB Connection Error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
