import mongoose from 'mongoose';


// Define the Movie Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  actors: {
    type: [String], 
    required: true,
  },
  genre: {
    type: String,  
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  isTrending: { 
    type: Boolean, 
    default: false 
  }
  
});

// Create the Movie model based on the schema
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
