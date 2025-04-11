import React from 'react';
import useLocalStorage from './useLocalStorage';

function App() {
  const [name, setName] = useLocalStorage<string>('name', '');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1>Localstorage: Cross-Tab Synced Form</h1>
      <label htmlFor="nameInput">Enter your name:</label>
      <input
        id="nameInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder=""
        style={{
          display: 'block',
          padding: '0.5rem',
          fontSize: '1rem',
          marginTop: '0.5rem',
          marginBottom: '1rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      <p>Hello, <strong>{name || 'you'}</strong>!</p>
      <p>Saved in localStorage and syncs across browser tabs.</p>
    </div>
  );
}

export default App;
