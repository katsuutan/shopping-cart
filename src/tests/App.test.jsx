import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '../routes';

const mockProducts = [
  { id: 1, title: 'Product 1', price: 9.99, image: 'test1.jpg' },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('App cart logic', () => {
  it('renders the navbar', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('cart count starts at 0', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('link', { name: /cart \(0\)/i })).toBeInTheDocument();
  });

  it('cart count updates when an item is added', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockProducts),
    });

    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);

    await user.click(await screen.findByRole('button', { name: /add to cart/i }));
    expect(screen.getByRole('link', { name: /cart \(1\)/i })).toBeInTheDocument();
  });
});