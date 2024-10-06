// src/services/movieService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/movies'; 


// Fetch all movies
export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Fetch recommended movies
export const getRecommendedMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    throw error;
  }
};

export const getMovieById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};

// Fetch movies by genre
export const getMoviesByGenre = async (genre: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genre/${genre}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies with genre ${genre}:`, error);
    throw error;
  }
};

// Fetch all genres
export const getAllGenres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genres`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error; 
  }
};
