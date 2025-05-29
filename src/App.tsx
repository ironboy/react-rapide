import type { AnalogClockSettings } from './interfaces/AnalogClock';
import { useState } from 'react';
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';

export default function App() {

  const [clockShown, setClockShown] = useState(false);
  const [typeAnalog, setTypeAnalog] = useState(false);
  const [analogSettings, setAnalogSettings] = useState<AnalogClockSettings>({
    faceColor: '#f4f4f4',
    borderColor: '#800000',
    lineColor: '#000000',
    largeColor: '#800000',
    secondColor: '#ff7f50'
  });

  return <>
    <button onClick={() => setClockShown(!clockShown)}>
      {clockShown ? 'Hide' : 'Show'} clock
    </button>

    {!clockShown ? null : <>
      <button onClick={() => setTypeAnalog(!typeAnalog)}>
        {typeAnalog ? 'Digital' : 'Analog'}
      </button>
      {typeAnalog ?
        <AnalogClock {...{ ...analogSettings, setAnalogSettings }} /> :
        <DigitalClock />
      }
    </>}
  </>;
}