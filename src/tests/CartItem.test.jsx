import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from '../components/CartItem/CartItem';

const mockItem = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  image: 'test.jpg',
  quantity: 2,
};

describe('CartItem', () => {
  it('renders the item title, price and quantity', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={vi.fn()} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('clicking + calls onUpdateQuantity with quantity + 1', async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();
    render(<CartItem item={mockItem} onUpdateQuantity={mockUpdateQuantity} />);
    await user.click(screen.getByRole('button', { name: '+' }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('clicking - calls onUpdateQuantity with quantity - 1', async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();
    render(<CartItem item={mockItem} onUpdateQuantity={mockUpdateQuantity} />);
    await user.click(screen.getByRole('button', { name: '-' }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('clicking Remove calls onUpdateQuantity with 0', async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();
    render(<CartItem item={mockItem} onUpdateQuantity={mockUpdateQuantity} />);
    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 0);
  });
});