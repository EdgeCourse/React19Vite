// components/SubmitButton.jsx
import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = ({ children }) => (
  <Button type="submit" variant="contained" color="primary" fullWidth>
    {children}
  </Button>
);

export default SubmitButton;
