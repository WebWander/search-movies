import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrendingCarousel from './TrendingCarousel';
import { getTrendingMovies } from '../services/GetApi';
import { vi } from 'vitest';

// Mock the `getTrendingMovies` function
vi.mock('../services/GetApi', () => ({
  getTrendingMovies: vi.fn(),
}));

const mockMovies = [
  {
    _id: '1',
    title: 'Movie One',
    thumbnail: 'https://example.com/movie1.jpg',
    genre: 'Action',
  },
  {
    _id: '2',
    title: 'Movie Two',
    thumbnail: 'https://example.com/movie2.jpg',
    genre: 'Drama',
  },
  {
    _id: '3',
    title: 'Movie Three',
    thumbnail: 'https://example.com/movie3.jpg',
    genre: 'Comedy',
  },
];

describe('TrendingCarousel', () => {
  it('displays loading text initially', () => {
    (getTrendingMovies as jest.Mock).mockResolvedValueOnce([]);
    render(<TrendingCarousel />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message if fetching movies fails', async () => {
    (getTrendingMovies as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    render(<TrendingCarousel />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching trending movies')).toBeInTheDocument();
    });
  });

  it('renders movies correctly after successful fetch', async () => {
    (getTrendingMovies as jest.Mock).mockResolvedValueOnce(mockMovies);
    render(<TrendingCarousel />);

    // Wait for the loading text to be removed
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Check that movie titles are rendered
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });

    // Check that images are rendered correctly
    mockMovies.forEach((movie) => {
      const img = screen.getByAltText(movie.title);
      expect(img).toHaveAttribute('src', movie.thumbnail);
    });
  });

  it('renders the correct number of slides', async () => {
    (getTrendingMovies as jest.Mock).mockResolvedValueOnce(mockMovies);
    render(<TrendingCarousel />);

    await waitFor(() => {
      const movieElements = screen.getAllByRole('img');
      expect(movieElements.length).toBe(mockMovies.length);
    });
  });
});
