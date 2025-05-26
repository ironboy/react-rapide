import { useState } from 'react';
import DigitalClock from "./DigitalClock";

export default function App() {

  const [clockShown, setClockShown] = useState(false);

  return <>
    <button onClick={() => setClockShown(!clockShown)}>
      {clockShown ? 'Hide' : 'Show'} clock
    </button>
    {clockShown ? <DigitalClock /> : null}
  </>;
}