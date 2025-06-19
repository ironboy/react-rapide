import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Note from '../Note';

describe('Note Component', () => {
  it('renders the note content correctly', () => {
    render(<Note />);

    // Use getByText with a function when you want to
    // find part of text, rather than the whole text in an element
    expect(screen.getByText((content) =>
      content.includes('Now we have 4 components in our React app:')
    )).toBeInTheDocument();
  });

  it('displays all component names', () => {
    render(<Note />);

    expect(screen.getByText('App')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.getByText('SpeciesPhoto')).toBeInTheDocument();
  });

  it('renders component names in italic elements', () => {
    render(<Note />);

    const appElement = screen.getByText('App');
    expect(appElement.tagName).toBe('I');
  });
});