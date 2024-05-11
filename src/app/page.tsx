'use client';

import { Logo } from '../components/Logo/Logo';
import { NavBar } from '../components/NavBar/NavBar';

export default function Home() {
  return (
    <main className='flex-column-center'>
      <Logo route='/ASB.svg' width={800} height={600} alt='ASB logo' />
      <NavBar />
    </main>
  );
}
