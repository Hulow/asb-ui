import { config } from '../../config/config';
import { CustomPicture } from '../Image/Picture';

export function ProjectOverview() {
  return (
    <div className='flex-col-center'>
      <CustomPicture src={`chamber/${config.env}_room.webp`} />
    </div>
  );
}
