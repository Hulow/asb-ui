'use client';

import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo/Logo';
import { NavBar, OnEvent } from '../components/NavBar/NavBar';
import texts from '../data/texts.json';
import { Cabinets } from '../components/Cabinets/Cabinets';
import { Station } from '../components/Station/Station';
import { ProjectOverview } from '../components/ProjectOverview/ProjectOverview';
import { config } from '../config/config';
import { CabinetOverview } from '../types/cabinet-overview';

export default function Home() {
  const endpoint = config.endpoints.cabinets;
  const [cabinets, setCabinets] = useState<CabinetOverview[]>([]);
  const [event, setEvent] = useState<undefined | OnEvent>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.asbBaseUrl}${endpoint}`, {
      headers: { Authorization: config.asbKeyUrl },
    })
      .then((res) => res.json())
      .then((data) => {
        setCabinets(data);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return <div></div>;
  }

  function handleEvent(event: any): void {
    setEvent(event);
  }

  return (
    <main className='flex-column-center'>
      <Logo route='/ASB.svg' width={800} height={600} alt='ASB logo' />
      <NavBar onEvent={handleEvent} />
      {event?.state ? <Content event={event} /> : null}
    </main>
  );

  function Content({ event }: { event: OnEvent }) {
    switch (event?.name) {
      case texts.ProjectOverview:
        return <ProjectOverview />;
      case texts.station:
        return <Station />;
      case texts.cabinets:
        return <Cabinets cabinets={cabinets} />;
    }
  }
}
