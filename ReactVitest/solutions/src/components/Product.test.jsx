import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from './Product';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('Product Component', () => {
  const mockOnBack = vi.fn();
  const product = {
    id: 1,
    name: 'Product 1',
    description: 'Product description',
    price: '100',
    stock: 10,
  };

  beforeEach(() => {
    mockOnBack.mockClear();
    axios.put.mockClear();
  });

  test('renders product details', () => {
    render(<Product product={product} onBack={mockOnBack} />);

    expect(screen.getByLabelText(/Name:/)).toHaveValue('Product 1');
    expect(screen.getByLabelText(/Description:/)).toHaveValue('Product description');
    expect(screen.getByLabelText(/Price:/)).toHaveValue('100');
    expect(screen.getByLabelText(/Stock:/)).toHaveValue(10);
  });

  test('allows user to edit product and save', async () => {
    const updatedProduct = {
      id: 1,
      name: 'Updated Product',
      description: 'Updated description',
      price: '200',
      stock: 5,
    };

    axios.put.mockResolvedValue({ data: updatedProduct });

    render(<Product product={product} onBack={mockOnBack} />);

    fireEvent.change(screen.getByLabelText(/Name:/), { target: { value: updatedProduct.name } });
    fireEvent.change(screen.getByLabelText(/Description:/), { target: { value: updatedProduct.description } });
    fireEvent.change(screen.getByLabelText(/Price:/), { target: { value: updatedProduct.price } });
    fireEvent.change(screen.getByLabelText(/Stock:/), { target: { value: updatedProduct.stock } });

    fireEvent.click(screen.getByText(/Save/));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/products/1',
        expect.objectContaining({
          name: 'Updated Product',
          description: 'Updated description',
          price: '200',
          stock: 5,
        })
      );
      expect(mockOnBack).toHaveBeenCalled();
    });
  });

  test('calls onBack when Back to list button is clicked', () => {
    render(<Product product={product} onBack={mockOnBack} />);
    fireEvent.click(screen.getByText(/Back to list/));
    expect(mockOnBack).toHaveBeenCalled();
  });

  test('handles errors during product save', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    axios.put.mockRejectedValue(new Error('Network Error'));

    render(<Product product={product} onBack={mockOnBack} />);
    fireEvent.click(screen.getByText(/Save/));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Error updating product/),
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
