import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock child components to simplify test
vi.mock('./pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('./pages/Categories', () => ({ default: () => <div>Categories Page</div> }));
vi.mock('./pages/Bookmarked', () => ({ default: () => <div>Bookmarked Page</div> }));
vi.mock('./pages/MovieView', () => ({ default: () => <div>Movie View Page</div> }));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
        <App />
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

    // Locate the menu button
    const menuButton = screen.getByLabelText('Toggle Menu');
    
    // Get the mobile menu container using the class name that controls visibility
    const menuContainer = screen.getByText('Categories').closest('div');

    // Ensure the menu starts closed
    expect(menuContainer).toHaveClass('hidden');

    // Open the mobile menu
    await userEvent.click(menuButton);

    // Ensure the 'hidden' class is removed when the menu opens
    expect(menuContainer).not.toHaveClass('hidden');

    // Close the mobile menu
    await userEvent.click(menuButton);

    // Ensure the 'hidden' class is applied again
    expect(menuContainer).toHaveClass('hidden');
  });
});


