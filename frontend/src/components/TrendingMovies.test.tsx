import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, afterEach} from 'vitest';
import TrendingMovies from './TrendingMovies';

// Mock the fetch API globally
global.fetch = vi.fn();

describe('TrendingMovies Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays loading message initially', () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]), 
    });

    render(<TrendingMovies />);

    expect(screen.getByText(/loading trending movies/i)).toBeInTheDocument();
  });

  it('displays error message if fetching fails', async () => {
    (fetch as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch trending movies'));

    render(<TrendingMovies />);

    await waitFor(() => {
      expect(screen.getByText(/error: failed to fetch trending movies/i)).toBeInTheDocument();
    });
  });

  it('displays movies in the carousel after successful fetch', async () => {
    const mockMovies = [
      { _id: '1', title: 'Movie 1', thumbnail: 'movie1.jpg', imageUrl: 'url1.jpg' },
      { _id: '2', title: 'Movie 2', thumbnail: 'movie2.jpg', imageUrl: 'url2.jpg' },
    ];
  
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMovies),
    });
  
    render(<TrendingMovies />);
  
   
    await waitFor(() => {
     
      const movie1AltTexts = screen.getAllByAltText(/thumbnail of movie 1/i);
      expect(movie1AltTexts.length).toBeGreaterThan(0); 
      expect(movie1AltTexts[0]).toHaveAttribute('src', 'movie1.jpg'); 
  
      
      const movie2AltTexts = screen.getAllByAltText(/thumbnail of movie 2/i);
      expect(movie2AltTexts.length).toBeGreaterThan(0); 
      expect(movie2AltTexts[0]).toHaveAttribute('src', 'movie2.jpg'); 
    });
  });
  
  
  
});
