import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProductList from './ProductList';
import ProgressBar from './ProgressBar';

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1>Product Search</h1>
      <SearchBar value={search} onChange={setSearch} />
      {/*<ProgressBar /> */}
      <ProductList products={products} query={search} />
    </div>
  );
};

export default App;
