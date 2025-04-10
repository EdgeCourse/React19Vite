// tests/TodoList.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  it('adds a todo item', () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText('Add a todo') as HTMLInputElement;
    const button = getByText('Add');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(getByText('New Todo')).toBeDefined();
  });
});