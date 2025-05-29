import type { AnalogClockProps } from './interfaces/AnalogClock';
import { useState, useEffect, useRef } from 'react';
import AnalogSettings from './AnalogSettings';
import clockAnimation from './utils/clockAnimation';

export default function AnalogClock(props: AnalogClockProps) {

  const canvasRef = useRef(null);

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const requestAnimationFrameHolder =
      clockAnimation({
        canvas: canvasRef.current as unknown as HTMLCanvasElement,
        ...props
      });
    return () => cancelAnimationFrame(requestAnimationFrameHolder.latest);
  });

  return <>
    {showSettings ?
      <AnalogSettings {...{ ...props, setShowSettings }} /> :
      <button
        className="clock-settings"
        onClick={e => { setShowSettings(!showSettings); e.stopPropagation(); }}
      >Set colors</button>
    }
    <div className="clock-container-outer">
      <div className="clock-container">
        <canvas ref={canvasRef} width="500" height="500"></canvas>
      </div>
    </div>
  </>;
}