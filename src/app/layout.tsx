import './layout.css';
import './globals.css';
import { Footer } from '../components/Footer/Footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ASB',
  description: 'Anechoic Station Berlin',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
