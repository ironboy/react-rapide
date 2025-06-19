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

    // Button text should change
    expect(screen.getByText('Hide clock')).toBeInTheDocument();

    // Now the clock controls should be visible in Digital mode
    // with a Button/switch to make it analog
    expect(screen.getByText('Analog')).toBeInTheDocument();
  });

  it('switches between digital and analog clock types', () => {
    render(<App />);

    // First show the clock
    fireEvent.click(screen.getByText('Show clock'));

    // Now the clock controls should be visible in Digital mode
    // with a Button/switch to make it analog
    const typeButton = screen.getByText('Analog');
    expect(typeButton).toBeInTheDocument();

    // Click to switch to analog clock
    fireEvent.click(typeButton);

    // Now the clock controls should be visible in Analog mode
    // with a Button/switch to make it analog
    expect(screen.getByText('Digital')).toBeInTheDocument();

    // Switch to digital
    fireEvent.click(screen.getByText('Digital'));

    // Should show the digital clock display - check for digits
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('maintains analog clock when toggling visibility', () => {
    render(<App />);

    // Show clock and switch to analog
    fireEvent.click(screen.getByText('Show clock'));
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
    fireEvent.click(screen.getByText('Analog'));

    // Open settings and change a color
    fireEvent.click(screen.getByText('Set colors'));
    const faceColorInput = screen.getByLabelText('Face Color');
    fireEvent.change(faceColorInput, { target: { value: '#ff0000' } });

    // Close settings
    fireEvent.click(screen.getByText('Close Settings'));

    // Switch to digital and back to analog
    fireEvent.click(screen.getByText('Digital'));
    fireEvent.click(screen.getByText('Analog'));

    // Settings should remember the color change
    fireEvent.click(screen.getByText('Set colors'));
    expect(screen.getByLabelText('Face Color')).toHaveValue('#ff0000');
  });
});