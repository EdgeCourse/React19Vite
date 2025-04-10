// tests/Counter.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from '../components/Counter';

describe('Counter', () => {
  it('increments the count', () => {
    const { getByText } = render(<Counter />);
    const button = getByText('Increment');
    fireEvent.click(button);
    expect(getByText('Count: 1')).toBeDefined();
  });
});

//Jest version - slower, uses own matchers that look the same
/* 
Older versions of React come with Jest but if not, 
1. Install Jest and friends:

npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest

2. Create or update jest.config.ts:

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

3. Create jest.setup.ts:

import '@testing-library/jest-dom';

4. Add to your package.json:

"scripts": {
  "test": "jest"
}
*/
/*
// tests/Counter.test.tsx
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // 👈 Add this for `.toBeInTheDocument()`
import Counter from '../components/Counter';

describe('Counter', () => {
  it('increments the count', () => {
    const { getByText } = render(<Counter />);
    const button = getByText('Increment');
    fireEvent.click(button);
    expect(getByText('Count: 1')).toBeInTheDocument();
  });
});
*/

//React testing library is instead of Enzyme. Enzyme example:
/* 
It shallow renders, so child components might not render at all

It relies on implementation details (specific tag usage)

No longer maintained

Not compatible with React 18+ without hacks, Enzyme is deprecated and doesn't fully support React 18+, but if you're on React 16 or 17, it can still work.
*/

/*
// Counter.enzyme.test.tsx
import { shallow } from 'enzyme';
import Counter from './Counter';

test('increments the count', () => {
  const wrapper = shallow(<Counter />);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('p').text()).toBe('Count: 1');
});
*/