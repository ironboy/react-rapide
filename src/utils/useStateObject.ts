import { useState } from 'react';

export default function useStateObject(object: any) {
  const [state, setState] = useState(object);
  function setter(key: string, value: any) {
    setState({ ...state, [key]: value });
  }
  return [state, setter];
}