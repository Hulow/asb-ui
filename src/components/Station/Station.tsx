import '../../styles/components/station.scss';

export function Station() {
  return (
    <div className='station flex-col'>
      <div>
        <h1>Overview</h1>
        <p>Who I am </p>
        <p>Localisation</p>
        <p>Goal</p>
      </div>
      <div>
        <h1>Station</h1>
        <p>Area and volume</p>
      </div>
      <div>
        <h1>Materiaux</h1>
        <p>room itselve and cones</p>
      </div>
      <div>
        <h1>Software</h1>
        <p>Hexa</p>
        <p>Classic web app SSR</p>
      </div>
      <div>
        <h1>Measurements</h1>
        <p>Technics</p>
        <p>Software used</p>
        <p>Hardware used</p>
      </div>
      <div>
        <h1>Feedback from the room</h1>
        <p>Low frequency because of the size</p>
      </div>
    </div>
  );
}
