'use client';
import './Button.css';
import { useState } from 'react';
import { getClassNames } from '../../util/util';

export function Button({
  children,
  onEvent,
  classNames,
}: {
  children: React.ReactNode;
  onEvent?: any;
  classNames?: string[];
}) {
  const [isActive, setIsActive] = useState(false);
  if (onEvent) onEvent(isActive);
  const className = getClassNames('button flex-center interaction', classNames);

  return (
    <div className={className} onClick={() => setIsActive(!isActive)}>
      {children}
    </div>
  );
}
