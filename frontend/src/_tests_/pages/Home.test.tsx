import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
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
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/movies');
    });

    // Validate the trending section
    await waitFor(() => {
      const trendingMovie = screen.getByText('Inception');
      expect(trendingMovie).toBeInTheDocument();
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
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/movies');
    });

    // Validate the recommended section
    await waitFor(() => {
      const recommendedMovie = screen.getByText('Interstellar');
      expect(recommendedMovie).toBeInTheDocument();
    });
  });
});
