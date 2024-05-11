import './DropdownItem.css';

export const DropdownItem = ({
  owner,
  selectedOwner,
}: {
  owner: string;
  selectedOwner: any;
}) => {
  return (
    <div className='dropdown-item component' onClick={selectProp}>
      <h2>{owner}</h2>
    </div>
  );

  function selectProp(event: any): void {
    const h2Tags = document.querySelectorAll('.dropdown-item h2');
    const targetOwner = getTargetOwner(h2Tags, event.target.innerHTML);
    selectedOwner(targetOwner);
  }

  function getTargetOwner(h2Tags: NodeListOf<Element>, event: string): string {
    for (const h2 of h2Tags) {
      const h2Content = h2.textContent as string;
      if (matchEvent(h2Content, event)) return h2Content;
    }
    return event;
  }

  function matchEvent(h2Content: string, event: string): boolean {
    return new RegExp(h2Content).test(event);
  }
};
