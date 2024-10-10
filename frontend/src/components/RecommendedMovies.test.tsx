import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import RecommendedMovies from './RecommendedMovies';
import { getRecommendedMovies } from '../services/GetApi';

// Mock the API call using Vitest's vi
vi.mock('../services/GetApi', () => ({
  getRecommendedMovies: vi.fn(),
}));

describe('RecommendedMovies Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mocks
  });

  it('should display loading message initially', async () => {
    (getRecommendedMovies as jest.Mock).mockReturnValue(new Promise(() => {})); // Mock unresolved promise
    render(<RecommendedMovies />);
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('should display recommended movies when API call is successful', async () => {
    const mockMovies = [
      {
        _id: '1',
        title: 'Movie 1',
        thumbnail: 'http://example.com/movie1.jpg',
      },
      {
        _id: '2',
        title: 'Movie 2',
        thumbnail: 'http://example.com/movie2.jpg',
      },
    ];

    (getRecommendedMovies as jest.Mock).mockResolvedValue(mockMovies);

    render(<RecommendedMovies />);

    await waitFor(() => {
      expect(screen.getByText('Recommended Movies')).toBeInTheDocument();
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    }, { timeout: 3000 }); // 3 seconds timeout

    expect(screen.getByAltText('Movie 1')).toHaveAttribute('src', 'http://example.com/movie1.jpg');
    expect(screen.getByAltText('Movie 2')).toHaveAttribute('src', 'http://example.com/movie2.jpg');
  });

  it('should display an error message when the API call fails', async () => {
    (getRecommendedMovies as jest.Mock).mockRejectedValue(new Error('Error fetching recommended movies'));

    render(<RecommendedMovies />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching recommended movies')).toBeInTheDocument();
    });
  });
});
