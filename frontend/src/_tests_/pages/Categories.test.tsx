import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Categories from '../../pages/Categories';
import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Categories Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('fetches and displays movies by genre', async () => {
    
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { _id: '1', title: 'Movie1', genre: 'Action' },
        { _id: '2', title: 'Movie2', genre: 'Drama' },
      ],
    });
  
    // Mock response for fetching movies by genre
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ _id: '1', title: 'Movie1', genre: 'Action' }],
    });
  
    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );
  
    const actionButton = await screen.findByText('Action');
    await userEvent.click(actionButton);
  
    // Verifying that the API call has been made with the correct genre
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/genres/genre/Action'));
  
    const movieTitle = await screen.findByText('Movie1');
    expect(movieTitle).toBeInTheDocument();
  });
  
});
