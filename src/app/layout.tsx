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
        <meta
          name='description'
          content='Semi Anechoic Chamber based in Berlin'
        />
        <meta
          name='keywords'
          content='Berlin, Anechoic, Anechoic Chamber, Non Profit Project'
        />
        <meta property='og:title' content='Anechoic Station Berlin' />
        <meta property='og:description' content='Non Profit Project' />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dmmaqdqha/image/upload/v1720454059/ASB_tembxv.png'
        />
        <link
          rel='icon'
          href='./icon.png'
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
