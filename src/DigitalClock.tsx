import { useState, useEffect } from 'react';

export default function DigitalClock() {

  // A state variable with the current time formatted in a Norwegian way
  const [time, setTime] = useState(new Date().toLocaleTimeString('no-NO'));

  // A useEffect with an empty dependency array runs
  // when the component 'mounts', i.e. is added to the DOM
  useEffect(() => {
    // We set an interval, that will change the time variable every second
    let interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('no-NO'));
    }, 1000);
    // Important: Clean up after yourself
    // The function we return will run
    // when the component unmounts - is removed from the DOM
    return () => clearInterval(interval);
  }, []);

  return <div className="digital-clock">
    <span>{time}</span>
  </div>;
}