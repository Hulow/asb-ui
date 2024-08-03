'use client';

import texts from '../../data/texts.json';
import { useState } from 'react';
import { CabinetOverview } from '../../types/cabinet-overview';
import { NavBar, OnEvent } from '../NavBar/NavBar';
import { Station } from '../Station/Station';
import { Cabinets } from '../Cabinets/Cabinets';
import { Logo } from '../Image/Logo';
import { ProjectOverview } from '../ProjectOverview/ProjectOverview';
import { PictureMetadata } from '../../app/page';

export interface PicturesMetadata {
  roomMetadata: PictureMetadata;
  roomWithDoorMetadata: PictureMetadata;
  roomWithWallsMetadata: PictureMetadata;
}

export const HomePage = ({
  cabinets,
  picturesMetadata,
}: {
  cabinets: CabinetOverview[];
  picturesMetadata: PicturesMetadata;
}) => {
  const [event, setEvent] = useState<undefined | OnEvent>(undefined);

  const handleEvent = (event: any): void => {
    setEvent(event);
  };

  const Content = ({ event }: { event: OnEvent }) => {
    switch (event?.name) {
      case texts.projectOverview:
        return <ProjectOverview picturesMetadata={picturesMetadata} />;
      case texts.about:
        return <Station />;
      case texts.measurements:
        return <Cabinets cabinets={cabinets} />;
    }
  };

  return (
    <main className='flex-l-col-center'>
      <Logo route='/ASB.svg' alt='Anechoic Station Berlin' />
      <NavBar onEvent={handleEvent} />
      {event?.state ? <Content event={event} /> : null}
    </main>
  );
};
