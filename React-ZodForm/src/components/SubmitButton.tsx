import React from 'react';
import Button from '@mui/material/Button';

type Props = {
  children: React.ReactNode;
};

const SubmitButton: React.FC<Props> = ({ children }) => (
  <Button type="submit" variant="contained" color="primary" fullWidth>
    {children}
  </Button>
);

export default SubmitButton;
