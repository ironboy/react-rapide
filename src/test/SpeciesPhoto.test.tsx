import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SpeciesPhoto from '../SpeciesPhoto';

describe('SpeciesPhoto Component', () => {
  it('renders image with correct src and alt attributes', () => {
    render(<SpeciesPhoto species="rabbit" />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', '/images/rabbits.jpg');
    expect(image).toHaveAttribute('alt', 'A photo of rabbits.');
  });

  it('constructs image path correctly for different species', () => {
    render(<SpeciesPhoto species="dog" />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', '/images/dogs.jpg');
    expect(image).toHaveAttribute('alt', 'A photo of dogs.');
  });

  it('handles species with different naming patterns', () => {
    render(<SpeciesPhoto species="cat" />);

    const image = screen.getByAltText('A photo of cats.');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/cats.jpg');
  });
});