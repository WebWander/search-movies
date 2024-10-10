import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoutes from './src/routes/movieRoutes'; 
import genreRoutes from './src/routes/genreRoutes';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://localhost:5173' 
  }));
app.use(express.json());


// Routes
app.use('/api/genres', genreRoutes);
app.use('/api/movies', movieRoutes);


mongoose
.connect(process.env.MONGO_URI || '')
.then(() => console.log("DB Connection Successful!"))
.catch((err: unknown) => console.error("DB Connection Error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
