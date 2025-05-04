/* eslint-disable react/no-unescaped-entities */
export function TempMessage() {
  return (
    <div className='station flex-col'>
      <h1>Temporary Downtime</h1>
      <p>
        Hey! My PostgreSQL container was recently targeted by a malicious bot.
        The website is currently in maintenance mode, so I'm unable to display
        any measurements at the moment. I’ll be back online soon—stay tuned!
      </p>
    </div>
  );
}
