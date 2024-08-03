import { PicturesMetadata } from '../Home/Home';
import { CustomPicture } from '../Image/Picture';

export function ProjectOverview({
  picturesMetadata,
}: {
  picturesMetadata: PicturesMetadata;
}) {
  return (
    <div className='flex-l-col-center'>
      <CustomPicture pictureMetadata={picturesMetadata.roomMetadata} />
      <CustomPicture pictureMetadata={picturesMetadata.roomWithDoorMetadata} />
      <CustomPicture pictureMetadata={picturesMetadata.roomWithWallsMetadata} />
    </div>
  );
}
