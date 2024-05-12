import './Cabinets.css';
import { CabinetOverview } from '../../types/cabinet-overview';
import { useState } from 'react';
import { DropdownButton } from '../Dropdown/DropdownButton/DropdownButton';
import { DropdownItem } from '../Dropdown/DropdownItem/DropdownItem';

const ALL_CABINETS = 'ALL';

export function Cabinets({ cabinets }: { cabinets: CabinetOverview[] }) {
  const [dropdownState, setDropdownState] = useState<boolean>(false);
  const [selectedOwner, setSelectedOwner] = useState<string>(ALL_CABINETS);

  let owners: string[] = [
    ...new Set(cabinets.map((cabinet: any) => cabinet.owner.ownername)),
  ];

  sortOwners();

  return (
    <div className='cabinets'>
      <div className='cabinets-menu flex-column-center'>
        <DropdownButton
          owner={selectedOwner ?? ALL_CABINETS}
          dropDownState={updateDropdownState}
        />
        {dropdownState
          ? owners.map((name, index) => (
              <DropdownItem
                key={index}
                owner={name}
                selectedOwner={updateOwnerSelection}
              />
            ))
          : null}
      </div>
    </div>
  );

  function sortOwners(): string[] {
    owners.push(ALL_CABINETS);
    if (selectedOwner === ALL_CABINETS) {
      return (owners = owners.filter((owner) => owner !== ALL_CABINETS));
    }
    if (selectedOwner) {
      return (owners = owners.filter((owner) => owner !== selectedOwner));
    }
    return owners;
  }

  function updateDropdownState(): void {
    setDropdownState(!dropdownState);
  }

  function updateOwnerSelection(event: string) {
    setSelectedOwner(event);
    setDropdownState(!dropdownState);
  }
}
