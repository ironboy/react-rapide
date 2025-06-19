import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DigitalClock from '../DigitalClock';

describe('DigitalClock Component', () => {
  it('renders time in correct format', () => {
    render(<DigitalClock />);

    // Should display time in HH:MM:SS format
    const timeDisplay = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeDisplay).toBeInTheDocument();
  });

  it('renders within digital clock container', () => {
    render(<DigitalClock />);

    // Should have the digital-clock class
    const clockContainer = screen.getByText(/\d{2}:\d{2}:\d{2}/).closest('.digital-clock');
    expect(clockContainer).toBeInTheDocument();
  });

  it('displays current time', () => {
    render(<DigitalClock />);

    // Get the displayed time
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    const displayedTime = timeElement.textContent;

    // Should be a valid time format
    const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
    expect(displayedTime).toMatch(timeRegex);
  });
});