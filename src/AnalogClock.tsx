import { useEffect, useRef } from 'react';
import clockAnimation from './utils/clockAnimation';

export default function AnalogClock() {

  const canvasRef = useRef(null);

  useEffect(() => {
    const requestAnimationFrameHolder =
      clockAnimation({ canvas: canvasRef.current });
    return () => cancelAnimationFrame(requestAnimationFrameHolder.latest);
  });

  return <div className="clock-container-outer">
    <div className="clock-container">
      <canvas ref={canvasRef} width="500" height="500"></canvas>
    </div>
  </div>;
}