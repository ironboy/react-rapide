import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AnalogSettingsProps } from '../interfaces/AnalogClock';
import AnalogSettings from '../AnalogSettings';

describe('AnalogSettings Form Interactions', () => {
  const mockSetAnalogSettings = vi.fn();
  const mockSetShowSettings = vi.fn();

  const defaultProps: AnalogSettingsProps = {
    faceColor: '#f4f4f4',
    borderColor: '#800000',
    lineColor: '#000000',
    largeColor: '#800000',
    secondColor: '#ff7f50',
    setAnalogSettings: mockSetAnalogSettings,
    setShowSettings: mockSetShowSettings
  };

  beforeEach(() => {
    mockSetAnalogSettings.mockClear();
    mockSetShowSettings.mockClear();
  });

  it('displays all color inputs with current values', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Check that all color labels are present
    expect(screen.getByText('Face Color')).toBeInTheDocument();
    expect(screen.getByText('Border Color')).toBeInTheDocument();
    expect(screen.getByText('Line Color')).toBeInTheDocument();
    expect(screen.getByText('Large Color')).toBeInTheDocument();
    expect(screen.getByText('Second Color')).toBeInTheDocument();

    // Check that color inputs have correct current values - use labels to avoid duplicates
    const faceColorInput = screen.getByLabelText('Face Color');
    const borderColorInput = screen.getByLabelText('Border Color');

    expect(faceColorInput).toHaveValue('#f4f4f4');
    expect(borderColorInput).toHaveValue('#800000');
  });

  it('calls setAnalogSettings when color input changes', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Find the face color input and change it
    const faceColorInput = screen.getByLabelText('Face Color');
    fireEvent.change(faceColorInput, { target: { value: '#ff0000' } });

    // Should call the setter function with updated colors
    expect(mockSetAnalogSettings).toHaveBeenCalledWith({
      ...defaultProps,
      faceColor: '#ff0000'
    });
  });

  it('updates multiple colors independently', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Change face color
    const faceColorInput = screen.getByLabelText('Face Color');
    fireEvent.change(faceColorInput, { target: { value: '#ff0000' } });

    // Change border color - use label to find the specific input
    const borderColorInput = screen.getByLabelText('Border Color');
    fireEvent.change(borderColorInput, { target: { value: '#00ff00' } });

    // Both calls should have been made
    expect(mockSetAnalogSettings).toHaveBeenCalledTimes(2);

    // Check the arguments of each call
    expect(mockSetAnalogSettings).toHaveBeenNthCalledWith(1, {
      ...defaultProps,
      faceColor: '#ff0000'
    });

    expect(mockSetAnalogSettings).toHaveBeenNthCalledWith(2, {
      ...defaultProps,
      borderColor: '#00ff00'
    });
  });

  it('calls setShowSettings when Close Settings is clicked', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Click close button
    fireEvent.click(screen.getByText('Close Settings'));

    // Should call the setter with false
    expect(mockSetShowSettings).toHaveBeenCalledWith(false);
  });
});

describe('Dynamic Form Generation', () => {
  const mockSetAnalogSettings = vi.fn();
  const mockSetShowSettings = vi.fn();

  const defaultProps: AnalogSettingsProps = {
    faceColor: '#f4f4f4',
    borderColor: '#800000',
    lineColor: '#000000',
    largeColor: '#800000',
    secondColor: '#ff7f50',
    setAnalogSettings: mockSetAnalogSettings,
    setShowSettings: mockSetShowSettings
  };

  it('generates form inputs for all color properties', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Should have exactly 5 color inputs (not counting function props)
    const colorInputs = document.querySelectorAll('input[type="color"]');
    expect(colorInputs).toHaveLength(5);

    // Each should be a color type input
    colorInputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'color');
    });
  });

  it('excludes function props from form generation', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Should not create inputs for setAnalogSettings or setShowSettings
    expect(screen.queryByText('Set Analog Settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Set Show Settings')).not.toBeInTheDocument();
  });

  it('generates proper labels from property names', () => {
    render(<AnalogSettings {...defaultProps} />);

    // Check that camelCase is converted to proper labels
    expect(screen.getByText('Face Color')).toBeInTheDocument();
    expect(screen.getByText('Border Color')).toBeInTheDocument();
    expect(screen.getByText('Line Color')).toBeInTheDocument();
    expect(screen.getByText('Large Color')).toBeInTheDocument();
    expect(screen.getByText('Second Color')).toBeInTheDocument();
  });
});