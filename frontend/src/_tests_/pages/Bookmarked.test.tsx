import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Bookmarked from '../../pages/Bookmarked';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Bookmarked Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
  });

  it('removes a bookmark when "Remove Bookmark" is clicked', async () => {
    const mockedMovies = [
      {
        _id: '1',
        title: 'Movie One',
        year: 2021,
        rating: 'PG-13',
        genre: 'Action',
        actors: ['Actor 1'],
        synopsis: 'Synopsis one',
        thumbnail: 'thumbnail1.jpg',
        isTrending: true,
      },
      {
        _id: '2',
        title: 'Movie Two',
        year: 2020,
        rating: 'R',
        genre: 'Drama',
        actors: ['Actor 2'],
        synopsis: 'Synopsis two',
        thumbnail: 'thumbnail2.jpg',
        isTrending: false,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockedMovies });
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

   
    render(
      <MemoryRouter>
        <Bookmarked />
      </MemoryRouter>
    );

    // Wait for the bookmarked movies to load
    await waitFor(() => {
      expect(screen.getByText('Movie One')).toBeInTheDocument();
      expect(screen.getByText('Movie Two')).toBeInTheDocument();
    });

    // Click the "Remove Bookmark" button for the first movie
    const removeButton = screen.getAllByText('Remove Bookmark')[0];
    await userEvent.click(removeButton);

    // Check that axios post request was called with correct parameters
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/bookmarks/remove',
        { movie: '1' }
      );
      expect(screen.queryByText('Movie One')).not.toBeInTheDocument();
    });
  });
});
