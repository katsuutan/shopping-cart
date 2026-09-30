import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  image: 'test.jpg',
};

describe('ProductCard', () => {
  it('renders the product title and price', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('quantity input starts at 1', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('clicking + increments the quantity', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(2);
  });

  it('clicking - at 1 does not go below 1', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('typing a valid number updates the quantity', async () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5' } });
    expect(screen.getByRole('spinbutton')).toHaveValue(5);
  });

  it('typing an invalid value does not update the quantity', async () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '0' } });
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('clicking Add to Cart calls onAddToCart with correct product and quantity', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('clicking + then Add to Cart calls onAddToCart with quantity 2', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
  });

  it('typing a valid number then Add to Cart calls onAddToCart with that quantity', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });
});