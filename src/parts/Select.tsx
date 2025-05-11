interface SelectProps {
  label: string;
  value: string;
  changeHandler: Function;
  options: string[];
}

export default function Select(
  { label, value, changeHandler, options }: SelectProps
) {
  return <label className="d-block">
    <span>{label}:</span>
    <select
      className="form-select bg-light mb-4 w-50"
      value={value}
      onChange={e => changeHandler(e.target.value)}
    >
      {options.map((x, i) => <option key={i}>{x}</option>)}
    </select>
  </label>;
}