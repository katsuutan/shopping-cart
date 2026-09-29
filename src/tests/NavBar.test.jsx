import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NavBar from '../components/NavBar/NavBar';

describe('NavBar', () => {
  it('renders the navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar cartCount={0} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
  });

  it('displays the correct cart count', () => {
    render(
      <MemoryRouter>
        <NavBar cartCount={5} />
      </MemoryRouter>
    );

    screen.debug();

    expect(screen.getByRole('link', { name: /cart \(5\)/i })).toBeInTheDocument();
  });
});