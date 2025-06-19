import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Animal from '../Animal';

describe('Animal Component', () => {
  it('renders animal information correctly', () => {
    // Arrange: Prepare test data
    const animalData = {
      species: 'rabbit',
      description: 'fluffy'
    };

    // Act: Render with specific props
    render(<Animal {...animalData} />);

    // Assert: Check that the content appears correctly
    const heading = screen.getByRole('heading', { level: 2 });
    const description = screen.getByText(/I like rabbits. They are so fluffy!/);

    expect(heading).toHaveTextContent('Rabbits');
    expect(description).toBeInTheDocument();
  });

  it('capitalizes species name correctly', () => {
    const animalData = {
      species: 'dog',
      description: 'loyal'
    };

    render(<Animal {...animalData} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Dogs');
  });

  it('handles different animal data', () => {
    const animalData = {
      species: 'cat',
      description: 'cheeky'
    };

    render(<Animal {...animalData} />);

    const heading = screen.getByText('Cats');
    const description = screen.getByText(/I like cats. They are so cheeky!/);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});