import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeView from '@/components/HomeView';

it('renders localized content', () => {
  render(<HomeView title="Tere tulemast" cta="Alusta siit" />);
  expect(screen.getByRole('heading', { name: 'Tere tulemast' })).toBeInTheDocument();
  expect(screen.getByText('Alusta siit')).toBeInTheDocument();
});
