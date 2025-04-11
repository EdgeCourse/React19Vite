import React, { useMemo } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, query }) => {
  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(lower))
      .sort((a, b) => a.price - b.price);
  }, [products, query]);

  return (
    <div>
      {filtered.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
