// App.tsx
import React from 'react';
import Header from './components/Header';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <Header title="React + Vitest App" />
      <Counter />
      <TodoList />
    </div>
  );
};

export default App;