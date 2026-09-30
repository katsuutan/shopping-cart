import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '../routes';

describe('App cart logic', () => {
  const renderApp = () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);
  };

  it('renders the navbar', () => {
    renderApp();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('cart count starts at 0', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /cart \(0\)/i })).toBeInTheDocument();
  });
});