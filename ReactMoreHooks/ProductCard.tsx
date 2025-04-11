import React, { memo } from 'react';

const ProductCard = memo(({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
});

export default ProductCard;
