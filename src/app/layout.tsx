import './globals.scss';
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
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
