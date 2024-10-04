import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App heading', () => {
    render(<App />); 

    // Check if the heading 'App' is in the document
    const headingElement = screen.getByText(/App/i);
    expect(headingElement).toBeInTheDocument();
  });
});