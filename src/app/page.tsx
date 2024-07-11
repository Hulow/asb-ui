import { config } from '../config/config';
import { CabinetOverview } from '../types/cabinet-overview';
import { asbClient } from '../clients/asb';
import { HomePage } from '../components/Home/Home';

async function asbHandler(endpoint: string): Promise<CabinetOverview[]> {
  const response =  await asbClient.get(endpoint)
  return await response.data
}

export default async function Home() {
  const endpoint = config.endpoints.cabinets;
  const cabinets = await asbHandler(endpoint)
  return <HomePage cabinets={cabinets}/>
}