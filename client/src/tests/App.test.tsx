import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test.skip('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getByText(/write down these words/i);
  expect(headerElement).toBeInTheDocument();
});
