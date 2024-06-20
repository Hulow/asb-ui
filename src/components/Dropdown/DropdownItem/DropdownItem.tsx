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
      <p>{owner}</p>
    </div>
  );

  function selectProp(event: any): void {
    const pTags = document.querySelectorAll('.dropdown-item p');
    const targetOwner = getTargetOwner(pTags, event.target.innerHTML);
    selectedOwner(targetOwner);
  }

  function getTargetOwner(pTags: NodeListOf<Element>, event: string): string {
    for (const p of pTags) {
      const pContent = p.textContent as string;
      if (matchEvent(pContent, event)) return pContent;
    }
    return event;
  }

  function matchEvent(pContent: string, event: string): boolean {
    return new RegExp(pContent).test(event);
  }
};
