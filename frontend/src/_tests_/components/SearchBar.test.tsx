import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  const mockMovies = [
    { _id: '1', title: 'Inception' },
    { _id: '2', title: 'Interstellar' },
    { _id: '3', title: 'The Dark Knight' },
  ];

  const renderSearchBar = () => {
    return render(
      <BrowserRouter>
        <SearchBar movies={mockMovies} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText('Search for a movie...');
    expect(input).toBeInTheDocument();
  });

  it('updates input value on change', async () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText('Search for a movie...');
    await userEvent.type(input, 'Inception');
    expect(input).toHaveValue('Inception');
  });

  it('displays search results based on input', async () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText('Search for a movie...');
    await userEvent.type(input, 'Inception');

    const result = screen.getByText('Inception');
    expect(result).toBeInTheDocument();
  });

  it('does not display results when input is empty', async () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText('Search for a movie...');
    await userEvent.type(input, 'Inception');
    await userEvent.clear(input);

    const resultsContainer = screen.queryByText('Inception');
    expect(resultsContainer).toBeNull();
  });

  it('displays links to movie details', async () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText('Search for a movie...');
    await userEvent.type(input, 'Inception');

    const link = screen.getByRole('link', { name: 'Inception' });
    expect(link).toHaveAttribute('href', '/movie/1');
  });

  it('does not display any results if no matches found', async () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText('Search for a movie...');
    await userEvent.type(input, 'Nonexistent Movie');

    const resultsContainer = screen.queryByText('Nonexistent Movie');
    expect(resultsContainer).toBeNull();
  });
});
