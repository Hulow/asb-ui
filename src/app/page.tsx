'use client';

import { useState } from 'react';
import { Logo } from '../components/Logo/Logo';
import { NavBar } from '../components/NavBar/NavBar';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <main className='flex-column-center'>
      <Logo route='/ASB.svg' width={800} height={600} alt='ASB logo' />
      <NavBar onEvent={handleItemClick} />
    </main>
  );
}
