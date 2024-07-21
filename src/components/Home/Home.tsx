'use client';

import texts from '../../data/texts.json';
import { useState } from 'react';
import { CabinetOverview } from '../../types/cabinet-overview';
import { NavBar, OnEvent } from '../NavBar/NavBar';
import { Station } from '../Station/Station';
import { Cabinets } from '../Cabinets/Cabinets';
import { Logo } from '../Image/Logo';

export const HomePage = ({ cabinets }: { cabinets: CabinetOverview[] }) => {
  const [event, setEvent] = useState<undefined | OnEvent>(undefined);

  const handleEvent = (event: any): void => {
    setEvent(event);
  };

  const Content = ({ event }: { event: OnEvent }) => {
    switch (event?.name) {
      case texts.about:
        return <Station />;
      case texts.measurements:
        return <Cabinets cabinets={cabinets} />;
    }
  };

  return (
    <main className='flex-col-center'>
      <Logo route='/ASB.svg' alt='Anechoic Station Berlin' />
      <NavBar onEvent={handleEvent} />
      {event?.state ? <Content event={event} /> : null}
    </main>
  );
};
