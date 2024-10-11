import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieView from '../../pages/MovieView';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MovieView Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
  });

  it('fetches and displays movie details', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _id: '1',
        title: 'Movie Title',
        year: 2020,
        rating: 'PG-13',
        genre: 'Action',
        actors: ['Actor 1', 'Actor 2'],
        synopsis: 'Synopsis text',
        thumbnail: 'thumbnail.jpg',
      },
    });
    mockedAxios.get.mockResolvedValueOnce({ data: { isBookmarked: false } });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieView />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Movie Title')).toBeInTheDocument());
    expect(screen.getByText('Synopsis text')).toBeInTheDocument();
  });

  it('toggles bookmark status', async () => {
    // Initial API response for movie details and bookmark status
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        _id: '1',
        title: 'Movie Title',
        year: 2020,
        rating: 'PG-13',
        genre: 'Action',
        actors: ['Actor 1', 'Actor 2'],
        synopsis: 'Synopsis text',
        thumbnail: 'thumbnail.jpg',
      },
    }).mockResolvedValueOnce({ data: { isBookmarked: false } });

    // Mock responses for adding and removing bookmarks
    mockedAxios.post.mockImplementation((url) => {
      if (url === 'http://localhost:3000/api/bookmarks/add') {
        return Promise.resolve({ status: 201, data: { isBookmarked: true } });
      } else if (url === 'http://localhost:3000/api/bookmarks/remove') {
        return Promise.resolve({ status: 200, data: { isBookmarked: false } });
      }
      return Promise.reject(new Error('Unexpected URL in test'));
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieView />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for "Add to Bookmarks" to be present and then click it
    await waitFor(() => expect(screen.getByText('Add to Bookmarks')).toBeInTheDocument());
    const bookmarkButton = screen.getByText('Add to Bookmarks');
    await userEvent.click(bookmarkButton);

    // Check that axios.post was called with the add URL and proper data
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/bookmarks/add',
        { movie: '1' }
      );
      expect(screen.getByText('Remove Bookmark')).toBeInTheDocument();
    });

    // Click "Remove Bookmark" and check that axios.post was called with the remove URL
    await userEvent.click(screen.getByText('Remove Bookmark'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/bookmarks/remove',
        { movie: '1' }
      );
      expect(screen.getByText('Add to Bookmarks')).toBeInTheDocument();
    });
  });
});
