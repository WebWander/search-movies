import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockMovies = [
  { _id: '1', title: 'Inception', isTrending: true, thumbnail: 'path/to/thumbnail1.jpg' },
  { _id: '2', title: 'Interstellar', isTrending: false, thumbnail: 'path/to/thumbnail2.jpg' },
  { _id: '3', title: 'The Dark Knight', isTrending: true, thumbnail: 'path/to/thumbnail3.jpg' },
  { _id: '4', title: 'Dunkirk', isTrending: false, thumbnail: 'path/to/thumbnail4.jpg' },
];

describe('Home Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('fetches and displays trending movies', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check that the API call was made to fetch movies
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/movies');
    });

    // Validate that the trending movies are displayed
    await waitFor(() => {
      const trendingMovie1 = screen.getByText('Inception');
      const trendingMovie2 = screen.getByText('The Dark Knight');
      expect(trendingMovie1).toBeInTheDocument();
      expect(trendingMovie2).toBeInTheDocument();
    });
  });

  it('fetches and displays recommended movies', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockMovies });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check that the API call was made
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/movies');
    });

    // Validate that the recommended movies are displayed
    await waitFor(() => {
      const recommendedMovie1 = screen.getByText('Interstellar');
      const recommendedMovie2 = screen.getByText('Dunkirk');
      expect(recommendedMovie1).toBeInTheDocument();
      expect(recommendedMovie2).toBeInTheDocument();
    });
  });
});
