import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component User Interactions', () => {
  it('shows and hides the clock when button is clicked', () => {
    render(<App />);

    // Initially, clock should be hidden
    expect(screen.queryByText('Digital')).not.toBeInTheDocument();

    // Click the show/hide button
    const toggleButton = screen.getByText('Show clock');
    fireEvent.click(toggleButton);

    // Now the clock controls should be visible
    expect(screen.getByText('Digital')).toBeInTheDocument();

    // Button text should change
    expect(screen.getByText('Hide clock')).toBeInTheDocument();
  });

  it('switches between digital and analog clock types', () => {
    render(<App />);

    // First show the clock
    fireEvent.click(screen.getByText('Show clock'));

    // Initially shows "Digital" button (meaning analog is shown)
    const typeButton = screen.getByText('Digital');
    expect(typeButton).toBeInTheDocument();

    // Click to switch to digital clock
    fireEvent.click(typeButton);

    // Button should now show "Analog"
    expect(screen.getByText('Analog')).toBeInTheDocument();

    // Should show the digital clock display
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('maintains analog clock when toggling visibility', () => {
    render(<App />);

    // Show clock and switch to analog
    fireEvent.click(screen.getByText('Show clock'));
    fireEvent.click(screen.getByText('Digital'));
    fireEvent.click(screen.getByText('Analog'));

    // Hide and show again
    fireEvent.click(screen.getByText('Hide clock'));
    fireEvent.click(screen.getByText('Show clock'));

    // Should still be in analog mode
    expect(screen.getByText('Digital')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set colors' })).toBeInTheDocument();
  });
});

describe('Cross-Component Integration', () => {
  it('maintains color settings when switching clock types', () => {
    render(<App />);

    // Show clock and switch to analog
    fireEvent.click(screen.getByText('Show clock'));
    fireEvent.click(screen.getByText('Digital'));

    // Open settings and change a color
    fireEvent.click(screen.getByText('Set colors'));
    const faceColorInput = screen.getByDisplayValue('#f4f4f4');
    fireEvent.change(faceColorInput, { target: { value: '#ff0000' } });

    // Close settings
    fireEvent.click(screen.getByText('Close Settings'));

    // Switch to digital and back to analog
    fireEvent.click(screen.getByText('Digital'));
    fireEvent.click(screen.getByText('Analog'));

    // Settings should remember the color change
    fireEvent.click(screen.getByText('Set colors'));
    expect(screen.getByDisplayValue('#ff0000')).toBeInTheDocument();
  });
});