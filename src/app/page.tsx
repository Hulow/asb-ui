'use client';

import { useState } from 'react';
import { Logo } from '../components/Logo/Logo';
import { NavBar, OnEvent } from '../components/NavBar/NavBar';
import texts from '../data/texts.json';

export default function Home() {
  const [event, setEvent] = useState<undefined | OnEvent>(undefined);

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
}

function Content({ event }: { event: OnEvent }) {
  switch (event?.name) {
    case texts.content:
      return <div>CONTENT</div>;
    case texts.about:
      return <div>STATION</div>;
    case texts.measurements:
      return <div>MEASUREMENTS</div>;
  }
}
