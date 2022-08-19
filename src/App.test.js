import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Farewell, front-end', () => {
  render(<App />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});
