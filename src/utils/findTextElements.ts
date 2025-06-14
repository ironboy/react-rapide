import type { ReactNode, ReactElement } from 'react';
import React from 'react';

export function findTextElements(element: ReactNode, textElements: (string | number)[] = []): (string | number)[] {
  // Handle direct text content
  if (typeof element === 'string' || typeof element === 'number') {
    textElements.push(element);
    return textElements;
  }

  // Handle React elements
  if (React.isValidElement(element)) {
    // Check if element has direct text children
    if (element.props && (element.props as any).children) {
      React.Children.forEach((element.props as any).children, (child: ReactNode) => {
        findTextElements(child, textElements);
      });
    }
  }

  // Handle arrays of elements
  if (Array.isArray(element)) {
    element.forEach((child: ReactNode) => {
      findTextElements(child, textElements);
    });
  }

  return { textElements, element } as any;
}
