import type { ReactElement } from 'react';
import React, { useLayoutEffect } from 'react';

// Memory of functions to run
let funcMem: Function[] = [];
// Flag used for debouncing
let hasRun = false;

// Patch React.createElement
const orgCreateElement = React.createElement;
(React as any).createElement = (
  ...args: Parameters<typeof orgCreateElement>
): ReturnType<typeof orgCreateElement> => {
  return orgCreateElement(function UseOnAnyRenderWrapper(): ReactElement {
    typeof args[0] === 'function' && useLayoutEffect(() => {
      // Do nothing if the first useLayoutEffect during one render has run
      if (hasRun) { return; }
      // This is the first useLayoutEffect during one render
      hasRun = true;
      // Execute all functions after layout effects complete, before paint
      queueMicrotask(() => {
        funcMem.forEach(x => x());
        hasRun = false;
      });
    });
    return orgCreateElement(...args);
  });
};

// Custom hook
export default function useOnAnyRender(func: Function) {
  !funcMem.includes(func) && funcMem.push(func);
  return function remover() { funcMem = funcMem.filter(x => x !== func); };
}