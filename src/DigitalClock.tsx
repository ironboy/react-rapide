import { useState, useEffect } from 'react';

export default function DigitalClock() {

  const [time, setTime] = useState(new Date().toLocaleTimeString('no-NO'));

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('no-NO'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="digital-clock">
    <span>{time}</span>
  </div>;
}