'use client';

import texts from '../../data/texts.json';
import { useState } from 'react';
import { CabinetOverview } from '../../types/cabinet-overview';
import { NavBar, OnEvent } from '../NavBar/NavBar';
import { ProjectOverview } from '../ProjectOverview/ProjectOverview';
import { Station } from '../Station/Station';
import { Cabinets } from '../Cabinets/Cabinets';
import { Logo } from '../Image/Logo';
import { PictureMetadata } from '../../app/page';

export const HomePage = ({ cabinets, pictureMetadata }: { cabinets: CabinetOverview[], pictureMetadata: PictureMetadata }) => {
  const [event, setEvent] = useState<undefined | OnEvent>(undefined);

  const handleEvent = (event: any): void => {
    setEvent(event);
  };

  const Content = ({ event }: { event: OnEvent }) => {
    switch (event?.name) {
      case texts.projectOverview:
        return <ProjectOverview pictureMetadata={pictureMetadata}/>;
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
