'use client';

interface OnEvent {
  name: string;
  state: boolean;
}

import { useState } from 'react';
import { Logo } from '../components/Logo/Logo';
import { NavBar } from '../components/NavBar/NavBar';
import texts from '../data/texts.json';

export default function Home() {
  const [event, setEvent] = useState<undefined | OnEvent>(undefined);

  return (
    <main className='flex-column-center'>
      <Logo route='/ASB.svg' width={800} height={600} alt='ASB logo' />
      <NavBar onEvent={handleEvent} />
      {isEventSelected(texts.content, event) ? <div>CONTENT</div> : null}
      {isEventSelected(texts.about, event) ? <div>STATION</div> : null}
      {isEventSelected(texts.measurements, event) ? (
        <div>MEASUREMENTS</div>
      ) : null}
    </main>
  );

  function handleEvent(event: any): void {
    setEvent(event);
  }

  function isEventSelected(eventName: string, event?: OnEvent) {
    return event?.name === eventName && event.state;
  }
}
