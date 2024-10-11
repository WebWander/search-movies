import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Bookmarked from './pages/Bookmarked';
import MovieView from './pages/MovieView';
import { describe, it, expect, vi } from 'vitest';
import { getByText } from '@testing-library/dom';

// Mocking the child components
vi.mock('./pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('./pages/Categories', () => ({ default: () => <div>Categories Page</div> }));
vi.mock('./pages/Bookmarked', () => ({ default: () => <div>Bookmarked Page</div> }));
vi.mock('./pages/MovieView', () => ({ default: () => <div>Movie View Page</div> }));

describe('App Component', () => {
  it('renders the Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('navigates to Categories page when Categories link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const categoriesLink = screen.getByText('Categories');
    await userEvent.click(categoriesLink);

    await waitFor(() => expect(screen.getByText('Categories Page')).toBeInTheDocument());
  });

  it('navigates to Bookmarked page when Bookmarked link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const bookmarkedLink = screen.getByText('Bookmarked');
    await userEvent.click(bookmarkedLink);

    await waitFor(() => expect(screen.getByText('Bookmarked Page')).toBeInTheDocument());
  });

  it('navigates to MovieView page when path is "/movie/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Movie View Page')).toBeInTheDocument();
  });

  it('redirects to Home page on an unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('toggles the mobile menu', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  
    const menuButton = screen.getByLabelText('Toggle Menu');
  
    // Open the menu
    await userEvent.click(menuButton);
    expect(screen.getByText('Categories')).toBeVisible();
  
    
    await userEvent.click(menuButton);
  
    
    const menu = screen.getByText('Categories').closest('div');
    expect(menu).toHaveClass('hidden');  
  });
  
  
  
  
  
  
  
});
