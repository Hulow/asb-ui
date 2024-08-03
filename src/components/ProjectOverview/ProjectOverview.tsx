import { PicturesMetadata } from '../Home/Home';
import { CustomPicture } from '../Image/Picture';

export function ProjectOverview({
  picturesMetadata,
}: {
  picturesMetadata: PicturesMetadata;
}) {
  return (
    <div className='flex-l-col-center'>
      <>
        <CustomPicture pictureMetadata={picturesMetadata.roomMetadata} />
        <p>{picturesMetadata.roomMetadata.photographer}</p>
      </>
      <>
        <CustomPicture
          pictureMetadata={picturesMetadata.roomWithDoorMetadata}
        />
        <p>{picturesMetadata.roomWithDoorMetadata.photographer}</p>
      </>
      <>
        <CustomPicture
          pictureMetadata={picturesMetadata.roomWithWallsMetadata}
        />
        <p>{picturesMetadata.roomWithWallsMetadata.photographer}</p>
      </>
    </div>
  );
}
