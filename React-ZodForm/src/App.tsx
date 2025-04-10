// src/App.jsx
import React from 'react';
import Container from '@mui/material/Container';
import ContactForm from './components/ContactForm';

const App = () => (
  <Container maxWidth="sm">
    <h1>Contact Us</h1>
    <ContactForm />
  </Container>
);

export default App;
