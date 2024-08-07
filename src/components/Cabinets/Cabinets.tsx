import '../../styles/components/cabinets.scss';
import '../../app/globals.scss';
import { CabinetOverview } from '../../types/cabinet-overview';
import { useState } from 'react';
import { DropdownButton } from '../Dropdown/DropdownButton/DropdownButton';
import { DropdownItem } from '../Dropdown/DropdownItem/DropdownItem';
import { Card } from '../Card/Card';

const ALL_CABINETS = 'All cabinets';

export function Cabinets({ cabinets }: { cabinets: CabinetOverview[] }) {
  const [dropdownState, setDropdownState] = useState<boolean>(false);
  const [selectedOwner, setSelectedOwner] = useState<string>(ALL_CABINETS);

  let owners: string[] = [
    ...new Set(cabinets.map((cabinet: any) => cabinet.owner.ownername)),
  ];

  sortOwners();
  const cabinetsContent = getSelectedCabinets();

  return (
    <div className='cabinets flex-l-col-center'>
      <div className='cabinets-menu flex-l-col-center'>
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
      <div className='cabinet-cards'>
        {cabinetsContent.map((cabinet, index) => {
          return <Card key={index} cabinetContent={cabinet} />;
        })}
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

  function getSelectedCabinets(): CabinetOverview[] {
    if (selectedOwner === ALL_CABINETS) {
      return sortCabinets(cabinets);
    }

    const selectedCabinets = cabinets.filter(
      (cabinet) => cabinet.owner.ownername === selectedOwner
    );

    return sortCabinets(selectedCabinets);
  }

  function sortCabinets(cabinets: CabinetOverview[]): CabinetOverview[] {
    return cabinets.sort(
      (a, b) =>
        new Date(b.cabinet.createdAt).getTime() -
        new Date(a.cabinet.createdAt).getTime()
    );
  }
}
