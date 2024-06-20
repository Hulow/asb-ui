import './../../../styles/components/dropdown-button.scss';
import '../../../app/globals.scss';
import { useState } from 'react';

export const DropdownButton = ({
  owner,
  dropDownState,
}: {
  owner: string;
  dropDownState: any;
}) => {
  const [state, setState] = useState(false);

  function activateState(): void {
    setState(!state);
    dropDownState(state);
  }
  return (
    <div className='dropdown-btn interaction' onClick={activateState}>
      <p>{owner}</p>
    </div>
  );
};
