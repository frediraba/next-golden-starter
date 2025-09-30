import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeView from '@/components/HomeView';

it('renders title and cta', () => {
  render(<HomeView title="Welcome" cta="Start here" />);
  expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
  expect(screen.getByText(/start here/i)).toBeInTheDocument();
});
