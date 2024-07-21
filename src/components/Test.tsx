import { config } from '../config/config';
import { CabinetOverview } from '../types/cabinet-overview';

export async function Test(): Promise<CabinetOverview[]> {
  const cabinets = await fetch(
    `${config.asbBaseUrl}${config.endpoints.cabinets}`,
    {
      headers: {
        Authorization: config.asbKeyUrl,
      },
      cache: 'no-store',
    }
  );

  if (!cabinets.ok) {
    throw new Error('Failed to get cabinets');
  }

  return await cabinets.json();
}
