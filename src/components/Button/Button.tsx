import './Button.css';
import { useState } from 'react';
import { getClassNames } from '../../util/util';

export function Button({
  children,
  state,
  classNames
}: {
  children: React.ReactNode;
  state?: any;
  classNames?: string[];
}) {
  const [isActive, setIsActive] = useState(false);
  if (state) state(isActive);
  const className = getClassNames('button flex-center component', classNames);

  return (
    <div className={className} onClick={() => setIsActive(!isActive)}>
      {children}
    </div>
  );
}
