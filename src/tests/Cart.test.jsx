import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '../routes';

describe('Cart', () => {
  it('shows empty cart message when cart is empty', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/cart'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
  });
});