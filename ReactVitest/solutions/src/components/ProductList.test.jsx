import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios GET and DELETE requests
vi.mock('axios');

describe('ProductList Component', () => {
  const mockOnSelectProduct = vi.fn();

  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ];

  beforeEach(() => {
    mockOnSelectProduct.mockClear();
  });

  test('renders the list of products', async () => {
    axios.get.mockResolvedValue({ data: products });

    render(<ProductList onSelectProduct={mockOnSelectProduct} />);

    // Wait for the products to be rendered
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('calls onSelectProduct when a product is clicked', async () => {
    axios.get.mockResolvedValue({ data: products });

    render(<ProductList onSelectProduct={mockOnSelectProduct} />);

    // Wait for the products to be rendered
    await waitFor(() => {
      fireEvent.click(screen.getByText('Product 1'));
    });

    // Verify that onSelectProduct was called with the correct product
    expect(mockOnSelectProduct).toHaveBeenCalledWith({ id: 1, name: 'Product 1' });
  });

  test('handles product deletion and refreshes the list', async () => {
    axios.get.mockResolvedValue({ data: products });
    axios.delete.mockResolvedValue({});

    render(<ProductList onSelectProduct={mockOnSelectProduct} />);

    // Wait for the products to be rendered
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    // Simulate the delete button click for Product 1
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Verify that the axios DELETE request was called with the correct product ID
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/products/1');
    });

    // Verify that after deleting, the list of products is refreshed
    expect(axios.get).toHaveBeenCalledTimes(4); // Once on mount, once after delete
  });

  test('handles error when fetching products', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<ProductList onSelectProduct={mockOnSelectProduct} />);

    // Verify that the error is handled gracefully (in this case, by logging an error)
    await waitFor(() => {
      expect(screen.queryByText('Product 1')).toBeNull();
      expect(screen.queryByText('Product 2')).toBeNull();
    });
  });
});
