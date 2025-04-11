import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ value, onChange }) => {
  const [internal, setInternal] = useState(value);
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(internal);
    }, 500);
    return () => clearTimeout(timeout);
  }, [internal]);

  return (
    <input
      ref={inputRef}
      value={internal}
      onChange={e => setInternal(e.target.value)}
      placeholder="Search products..."
    />
  );
};

export default SearchBar;
