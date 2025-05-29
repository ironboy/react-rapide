import { useState } from 'react';
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';

export default function App() {

  const [clockShown, setClockShown] = useState(false);
  const [typeAnalog, setTypeAnalog] = useState(false);

  return <>
    <button onClick={() => setClockShown(!clockShown)}>
      {clockShown ? 'Hide' : 'Show'} clock
    </button>

    {!clockShown ? null : <>
      <button onClick={() => setTypeAnalog(!typeAnalog)}>
        {typeAnalog ? 'Digital' : 'Analog'}
      </button>
      {typeAnalog ? <AnalogClock /> : <DigitalClock />}
    </>}
  </>;
}