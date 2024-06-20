import '../../../styles/components/dropdown-item.scss';

export const DropdownItem = ({
  owner,
  selectedOwner,
}: {
  owner: string;
  selectedOwner: any;
}) => {
  return (
    <div className='dropdown-item interaction' onClick={selectProp}>
      <h1>{owner}</h1>
    </div>
  );

  function selectProp(event: any): void {
    const h1Tags = document.querySelectorAll('.dropdown-item h1');
    const targetOwner = getTargetOwner(h1Tags, event.target.innerHTML);
    selectedOwner(targetOwner);
  }

  function getTargetOwner(h2Tags: NodeListOf<Element>, event: string): string {
    for (const h1 of h2Tags) {
      const h2Content = h1.textContent as string;
      if (matchEvent(h2Content, event)) return h2Content;
    }
    return event;
  }

  function matchEvent(h2Content: string, event: string): boolean {
    return new RegExp(h2Content).test(event);
  }
};
