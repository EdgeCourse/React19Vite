/*
Fixes:
Add aria-label or button text that uniquely identifies buttons

<div className="product-actions">
  <button onClick={() => onSelectProduct(product)} aria-label={`Edit ${product.name}`}>Edit</button>
  <button onClick={() => handleDelete(product.id)} aria-label={`Delete ${product.name}`}>Delete</button>
</div>

*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList({ onSelectProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div className="product-details" onClick={() => onSelectProduct(product)}>
              {product.name}
            </div>
            <div className="product-actions">
              <button onClick={() => onSelectProduct(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
/*
// src/components/ProductList.js
import React, { useEffect, useState } from 'react';

function ProductList({ onSelectProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} onClick={() => onSelectProduct(product)}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
*/