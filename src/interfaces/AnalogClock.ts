type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;

export interface AnalogClockSettings {
  faceColor: Color;
  borderColor: Color;
  lineColor: Color;
  largeColor: Color;
  secondColor: Color;
}

export interface AnalogClockProps
  extends AnalogClockSettings {
  setAnalogSettings: Function;
}

export interface AnalogSettingsProps
  extends AnalogClockProps {
  setShowSettings: Function;
}

export interface AnalogClockAnimationArgs
  extends AnalogClockSettings {
  canvas: HTMLCanvasElement;
}