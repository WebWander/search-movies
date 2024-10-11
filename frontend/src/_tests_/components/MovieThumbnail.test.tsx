import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import MovieThumbnail from '../../components/MovieThumbnail';

describe('MovieThumbnail', () => {
  const mockMovie = {
    _id: '1',
    title: 'Inception',
    thumbnail: 'path/to/thumbnail.jpg',
  };

  const renderMovieThumbnail = () => {
    return render(
      <BrowserRouter>
        <MovieThumbnail movie={mockMovie} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderMovieThumbnail();
    const titleElement = screen.getByText('Inception');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the movie thumbnail image', () => {
    renderMovieThumbnail();
    const imageElement = screen.getByRole('img', { name: 'Inception' });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'path/to/thumbnail.jpg');
  });

  it('displays the movie title', () => {
    renderMovieThumbnail();
    const titleElement = screen.getByText('Inception');
    expect(titleElement).toBeInTheDocument();
  });

  it('links to the correct movie detail page', () => {
    renderMovieThumbnail();
    const linkElement = screen.getByRole('link', { name: /Inception/i });
    expect(linkElement).toHaveAttribute('href', '/movie/1');
  });
});
