import { useState } from 'react';
import './Button.css';
import { CustomLink } from '../Link/Link';

export function Button({
  children,
  state,
  customClassName,
}: {
  children: React.ReactNode;
  state?: any;
  customClassName?: string;
}) {
  const [isActive, setIsActive] = useState(false);
  if (state) state(isActive);
  const className = 'button';
  const customClassNames = customClassName
    ? className + ' ' + customClassName
    : className;

  return (
    <div className={customClassNames} onClick={() => setIsActive(!isActive)}>
      {children}
    </div>
  );
}
