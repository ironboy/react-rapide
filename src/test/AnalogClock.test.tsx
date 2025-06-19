import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AnalogClockProps } from '../interfaces/AnalogClock';
import AnalogClock from '../AnalogClock';

describe('AnalogClock Settings Interactions', () => {
  const mockSetAnalogSettings = vi.fn();

  const defaultProps: AnalogClockProps = {
    faceColor: '#f4f4f4',
    borderColor: '#800000',
    lineColor: '#000000',
    largeColor: '#800000',
    secondColor: '#ff7f50',
    setAnalogSettings: mockSetAnalogSettings
  };

  beforeEach(() => {
    mockSetAnalogSettings.mockClear();
  });

  it('shows settings panel when Set colors button is clicked', () => {
    render(<AnalogClock {...defaultProps} />);

    // Initially, settings panel should be hidden
    expect(screen.queryByText('Face Color')).not.toBeInTheDocument();

    // Click the settings button
    fireEvent.click(screen.getByText('Set colors'));

    // Settings panel should now be visible
    expect(screen.getByText('Face Color')).toBeInTheDocument();
    expect(screen.getByText('Border Color')).toBeInTheDocument();
    expect(screen.getByText('Close Settings')).toBeInTheDocument();
  });

  it('hides settings panel when Close Settings is clicked', () => {
    render(<AnalogClock {...defaultProps} />);

    // Open settings panel
    fireEvent.click(screen.getByText('Set colors'));
    expect(screen.getByText('Face Color')).toBeInTheDocument();

    // Close settings panel
    fireEvent.click(screen.getByText('Close Settings'));

    // Settings panel should be hidden again
    expect(screen.queryByText('Face Color')).not.toBeInTheDocument();
    expect(screen.getByText('Set colors')).toBeInTheDocument();
  });

  it('toggles between settings button and settings panel', () => {
    render(<AnalogClock {...defaultProps} />);

    // Should show button, not panel
    expect(screen.getByText('Set colors')).toBeInTheDocument();
    expect(screen.queryByText('Close Settings')).not.toBeInTheDocument();

    // Open panel
    fireEvent.click(screen.getByText('Set colors'));

    // Should show panel, not button
    expect(screen.queryByText('Set colors')).not.toBeInTheDocument();
    expect(screen.getByText('Close Settings')).toBeInTheDocument();
  });

  it('renders canvas element for clock display', () => {
    render(<AnalogClock {...defaultProps} />);

    // Canvas should be present - query by tag name since canvas doesn't have implicit role
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '500');
    expect(canvas).toHaveAttribute('height', '500');
  });
});