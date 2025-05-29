import type { AnalogClockProps, AnalogSettingsProps }
  from "./interfaces/AnalogClock";

function niceLabel(x: string) {
  return x.replace(/^./g, x => x.toUpperCase())
    .replace(/([A-Z])/g, ' $1');
}

function setColor(
  props: AnalogClockProps, key: string, value: string
) {
  props.setAnalogSettings({ ...props, [key]: value });
}

export default function AnalogSettings(props: AnalogSettingsProps) {

  return <div className="analog-settings">
    {Object.entries(props).map(([key, value]) => <div key={key}>{
      key.startsWith('set') ? null : <label>
        <span>{niceLabel(key)}</span>
        <input
          type="color"
          value={value}
          onChange={e => setColor(props, key, e.target.value)}
        />
      </label>
    }</div>)}
    <p
      className="close-analog-settings"
      onClick={() => props.setShowSettings(false)}
    ><b>Close Settings</b></p>
  </div>;
}