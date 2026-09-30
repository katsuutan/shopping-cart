import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '../routes';

const mockProducts = [
  { id: 1, title: 'Product 1', price: 9.99, image: 'test1.jpg' },
  { id: 2, title: 'Product 2', price: 19.99, image: 'test2.jpg' },
  { id: 3, title: 'Product 3', price: 29.99, image: 'test3.jpg' },
];

// Resets the mock between each test.
beforeEach(() => {
  vi.restoreAllMocks();
});

describe('Shop', () => {
  it('shows a loading state while fetching', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 200,
      json: () => new Promise(() => {}),
    });

    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it('shows an error state if the fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 500,
      json: () => Promise.resolve([]),
    });

    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders the correct number of product cards after a successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockProducts),
    });

    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);

    const cards = await screen.findAllByRole('img');
    expect(cards).toHaveLength(3);
  });
});