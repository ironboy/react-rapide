interface SelectProps {
  label: string;
  value: string;
  changeHandler: Function;
  options: string[];
}

export default function Select(
  { label, value, changeHandler, options }: SelectProps
) {
  return <label>
    <span>{label}:</span>
    <select
      value={value}
      onChange={e => changeHandler(e.target.value)}
    >
      {options.map((x, i) => <option key={i}>{x}</option>)}
    </select>
  </label>;
}