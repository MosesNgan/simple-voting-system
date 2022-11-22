import { render, screen } from '@testing-library/react';
import App from './App';

test('renders `Simple Voting System` text', () => {
  render(<App />);
  const h1Element = screen.getByText(/Simple Voting System/i);
  expect(h1Element).toBeInTheDocument();
});
