import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Animals I like...');
  });

  it('renders the Note component', () => {
    render(<App />);

    const noteText = screen.getByText(/Now we have 4 components/);
    expect(noteText).toBeInTheDocument();
  });

  it('filters out snakes from the animal list', () => {
    render(<App />);

    // These animals should appear
    expect(screen.getByText('Rabbits')).toBeInTheDocument();
    expect(screen.getByText('Dogs')).toBeInTheDocument();
    expect(screen.getByText('Cats')).toBeInTheDocument();

    // Snakes should be filtered out
    expect(screen.queryByText('Snakes')).not.toBeInTheDocument();
  });

  it('displays animals in alphabetical order', () => {
    render(<App />);

    const animalHeadings = screen.getAllByRole('heading', { level: 2 });
    const animalNames = animalHeadings.map(heading => heading.textContent);

    expect(animalNames).toEqual(['Cats', 'Dogs', 'Rabbits']);
  });

  it('renders correct number of animal components', () => {
    render(<App />);

    // Should have 3 animals (rabbit, dog, cat - snake filtered out)
    const animalSections = screen.getAllByRole('img');
    expect(animalSections).toHaveLength(3);
  });
});