export default function Select(
  { label, values, setter }:
    { label: string; values: string[]; setter: Function; }
) {
  return <label>
    <span>{label}:</span>
    <select onChange={e => setter(e.target.value)}>
      {values.map((x, i) => <option key={i}>{x}</option>)}
    </select>
  </label>;
};