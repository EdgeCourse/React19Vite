import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from './ProductForm';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

test('submits the form and calls onAddProduct', async () => {
  const mockOnAddProduct = vi.fn();

  axios.post.mockResolvedValue({
    data: {
      id: 1,
      name: 'New Product',
      description: 'This is a great product',
      price: '99.99',
      stock: '50',
    },
  });

  render(<ProductForm onAddProduct={mockOnAddProduct} onCancel={vi.fn()} />);

  fireEvent.change(screen.getByLabelText(/Name:/), { target: { value: 'New Product' } });
  fireEvent.change(screen.getByLabelText(/Description:/), { target: { value: 'This is a great product' } });
  fireEvent.change(screen.getByLabelText(/Price:/), { target: { value: '99.99' } });
  fireEvent.change(screen.getByLabelText(/Stock:/), { target: { value: '50' } });

  fireEvent.submit(screen.getByTestId('product-form'));

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/products',
      expect.objectContaining({
        name: 'New Product',
        description: 'This is a great product',
        price: '99.99',
        stock: '50',
      })
    );

    expect(mockOnAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: 'New Product' })
    );
  });
});
