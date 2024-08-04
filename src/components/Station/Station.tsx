import '../../styles/components/station.scss';
import texts from '../../data/texts.json';

interface CustomLinkProps {
  href: string;
  target?: boolean;
  children: React.ReactNode;
}

export function Station() {
  return (
    <div className='station flex-col'>
      <div>
        <h1>About the project</h1>
        <p>
          Hello, my name is Victor, and this is my project related to acoustics.
          With a keen interest in loudspeaker design, I had the idea to build a
          semi anechoic chamber in a Soviet bunker located in southern Berlin.
        </p>
        <p>
          This room is focused on delivering accurate electro-acoustic
          measurements on loudspeakers by throwing an impulse signal, recording
          it via a microphone, and processing it via software.
        </p>
        <p>
          Believing that collaboration and transparency accelerate learning,
          this project is based on three pillars:
          <ul>
            <li>The project is non-profit-oriented.</li>
            <li>The room is open to everyone.</li>
            <li>
              All data recorded from this room is publicly accessible via this
              web application.
            </li>
          </ul>
        </p>
        <p>
          Currently, this web application provides frequency and impedance
          response plots. As mentioned, this room is a side project and so I
          will need additional time to deliver more loudspeaker analysis and
          make the application more responsive.
        </p>
      </div>
      <div>
        <h1>About the room</h1>
        <p>
          The room covers a floor area of 20 m² and a volume of 38 m³. Due to a
          budget constraint, the size of the room could not be bigger.
        </p>
        <p>
          The walls, door, ceiling, and floor are insulated with a 200 mm thick
          layer of rockwool.
        </p>
        <p>
          Additionally, a 16 mm perforated OSB layer has been applied to the
          walls and ceiling, acting as Helmholtz resonators.
        </p>
        <p>
          Approximately 200 absorbers are installed in the room. Each absorber
          consists of a fine layer of fiberglass (190 g/m²) coupled with
          polyester glass. The structure of these absorbers includes both an
          inner and outer layer of rockwool, improving sound absorption.
        </p>
      </div>
      <div>
        <h1>About the measurements</h1>
        <p>
          Each acoustic measurement uses the ground plane measurement technique
          in order to minimise floor reflections.
        </p>
        <p>
          Tests are conducted on axis with a microphone positioned between 1 to
          2 meters from the DUT (depending on the difficulty of the test).
        </p>
        <p>
          Each signal calibration and generation, data acquisition and analysis
          are handled by the software Room EQ wizard.
        </p>
        <p>
          Each thrown impulse is recorded by the microphone EEM6 Electret from
          Dayton Audio
        </p>
        <p>
          All audio signals are converted by the Scarlett 2i2 4th Generation
          audio interface from Focusrite.
        </p>
      </div>
      <div>
        <h1>Applications overview</h1>
        <p>This part is more geek-oriented.</p>
        <p>
          <CustomLink href={texts.asbAppUrl} target={true}>
            {texts.asbApp}
          </CustomLink>{' '}
          and{' '}
          <CustomLink href={texts.asbUiUrl} target={true}>
            {texts.asbUi}
          </CustomLink>{' '}
          are the applications designed for processing and rendering
          measurements on the web. Both repositories are available on github.
        </p>
        <p>
          <CustomLink href={texts.asbAppUrl} target={true}>
            {texts.asbApp}
          </CustomLink>{' '}
          acts as a backend, processing all measurements and storing them in a
          PostgreSQL database. It uses an IoC container provided by InversifyJS
          and follows the Hexagonal Architecture pattern introduced by Alistair
          Cockburn.
        </p>
        <p>
          <CustomLink href={texts.asbUiUrl} target={true}>
            {texts.asbUi}
          </CustomLink>{' '}
          serves as a frontend web application for rendering data, built with
          Next.js for server-side rendering. Lots of things have to be improved
          there since I have never had any proper experience with frontend
          development…
        </p>
        <p>
          Both applications are containerized with Docker and deployed on a
          Ubuntu virtual machine hosted by DigitalOcean.
        </p>
      </div>
    </div>
  );
}

export function CustomLink({
  href,
  target = false,
  children,
}: CustomLinkProps) {
  return (
    <a
      href={href}
      target={target ? '_blank' : '_self'}
      rel={target ? 'noopener noreferrer' : undefined}
      className='custom-link'
    >
      {children}
    </a>
  );
}
