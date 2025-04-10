// add <form onSubmit={handleSubmit} data-testid="product-form"> to form element
// fix testing file: fireEvent.submit(screen.getByTestId('product-form'));
//screen.getByRole('form') doesn't work — forms don’t have a role="form" by default, and getByRole('form') is invalid in Testing Library
/* 
getByRole('form') fails because forms have implicit roles that aren't exposed the way buttons or headings are. Testing Library doesn’t recognize them unless you explicitly provide a role or use a test ID.
*/
import React, { useState } from 'react';
import axios from 'axios'; //npm install axios

function ProductForm({ onAddProduct, onCancel }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products', newProduct);
      console.log('Product added:', response.data);
      onAddProduct(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} data-testid="product-form">

        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="name" value={newProduct.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" type="text" name="description" value={newProduct.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input id="price" type="text" name="price" value={newProduct.price} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input id="stock" type="number" name="stock" value={newProduct.stock} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default ProductForm;

/*
import React, { useState } from 'react';
import axios from 'axios'; //npm install axios

function ProductForm({ onAddProduct, onCancel }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products', newProduct);
      console.log('Product added:', response.data);
      onAddProduct(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={newProduct.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={newProduct.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default ProductForm;
*/