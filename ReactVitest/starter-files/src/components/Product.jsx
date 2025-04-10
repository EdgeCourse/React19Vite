/*
<label> elements aren’t properly associated with their corresponding <input> elements in your component. For screen readers and testing libraries like @testing-library/react, you need to either:

Use the htmlFor attribute on <label> to point to the id of the corresponding <input>, or

Wrap the <input> directly inside the <label>
*/
import React, { useState } from 'react';
import axios from 'axios';

function Product({ product, onBack }) {
  const [productData, setProductData] = useState(product);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${productData.id}`, productData);
      console.log('Product updated:', response.data);
      onBack();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="name" value={productData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" type="text" name="description" value={productData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input id="price" type="text" name="price" value={productData.price} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input id="stock" type="number" name="stock" value={productData.stock} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={onBack}>Back to list</button>
      </form>
    </div>
  );
}

export default Product;





/*
import React, { useState } from 'react';
import axios from 'axios';

function Product({ product, onBack }) {
  const [productData, setProductData] = useState(product);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${productData.id}`, productData);
      console.log('Product updated:', response.data);
      onBack();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={productData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={productData.price} onChange={handleChange} />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" value={productData.stock} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={onBack}>Back to list</button>
      </form>
    </div>
  );
}

export default Product;


*/