import './globals.scss';
import { Footer } from '../components/Footer/Footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anechoic Station Berlin',
  description: 'Semi Anechoic Chamber based in Berlin',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='./public/icon.png'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
