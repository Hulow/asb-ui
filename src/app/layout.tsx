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
        <link
          rel='icon'
          href='./icon.png'
          type="type='image/png'"
          sizes='<generated>'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}

const schemaMarkup = {
  '@context': 'http://schema.org',
  '@type': 'Non Profit Project',
  name: 'Anechoic Station Berlin',
  url: 'https://www.anechoic-station-berlin.com/',
  logo: 'https://res.cloudinary.com/dmmaqdqha/image/upload/v1720454059/ASB_tembxv.png',
  image: {
    '@type': 'ImageObject',
    url: 'https://res.cloudinary.com/dmmaqdqha/image/upload/v1720454059/ASB_tembxv.png',
    width: 1200,
    height: 800,
    caption: 'Anechoic Station Berlin',
  },
  description: 'Semi Anechoic Chamber based in Berlin.',
};
