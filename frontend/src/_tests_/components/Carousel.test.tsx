import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Carousel from '../../components/Carousel';
import { BrowserRouter } from 'react-router-dom';

describe('Carousel', () => {
  const mockMovies = [
    { _id: '1', title: 'Inception', thumbnail: 'path/to/thumbnail1.jpg' },
    { _id: '2', title: 'Interstellar', thumbnail: 'path/to/thumbnail2.jpg' },
    { _id: '3', title: 'The Dark Knight', thumbnail: 'path/to/thumbnail3.jpg' },
    { _id: '4', title: 'Dunkirk', thumbnail: 'path/to/thumbnail4.jpg' },
  ];

  const renderCarousel = () => {
    return render(
      <BrowserRouter>
        <Carousel movies={mockMovies} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderCarousel();
    const swiperElement = document.querySelector('.swiper'); // General swiper container class
    expect(swiperElement).toBeInTheDocument();
  });

  it('displays all movies as slides', () => {
    renderCarousel();
    mockMovies.forEach(movie => {
      const titleElement = screen.getByText(movie.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('renders correct number of SwiperSlide components', async () => {
    renderCarousel();
    // Use the Swiper-specific class for slides
    const slides = await waitFor(() => document.querySelectorAll('.swiper-slide'));
    expect(slides.length).toBe(mockMovies.length);
  });

  it('contains navigation and pagination controls', async () => {
    renderCarousel();

    const nextButton = await waitFor(() => document.querySelector('.swiper-button-next'));
    const prevButton = await waitFor(() => document.querySelector('.swiper-button-prev'));

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();

    const pagination = await waitFor(() => document.querySelector('.swiper-pagination'));
    expect(pagination).toBeInTheDocument();
  });
});
