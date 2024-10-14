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
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
  });

  it('toggles bookmark status', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
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
      })
      .mockResolvedValueOnce({ data: { isBookmarked: false } });

    mockedAxios.post.mockImplementation((url) => {
      if (url === `/api/bookmarks/add`) {
        return Promise.resolve({ status: 201, data: { isBookmarked: true } });
      } else if (url === `/api/bookmarks/remove`) {
        return Promise.resolve({ status: 200, data: { isBookmarked: false } });
      }
      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieView />} />
        </Routes>
      </MemoryRouter>
    );

    const addBookmarkButton = await screen.findByText('Add to Bookmarks');
    userEvent.click(addBookmarkButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/bookmarks/add', { movie: '1' });
      expect(screen.getByText('Remove Bookmark')).toBeInTheDocument();
    });

    const removeBookmarkButton = screen.getByText('Remove Bookmark');
    userEvent.click(removeBookmarkButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/bookmarks/remove', { movie: '1' });
      expect(screen.getByText('Add to Bookmarks')).toBeInTheDocument();
    });
  });
});
