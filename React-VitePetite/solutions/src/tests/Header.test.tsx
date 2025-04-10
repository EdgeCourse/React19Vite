// tests/Header.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header', () => {
  it('renders the title', () => {
    const { getByText } = render(<Header title="Test Title" />);
    expect(getByText('Test Title')).toBeDefined();
  });
});