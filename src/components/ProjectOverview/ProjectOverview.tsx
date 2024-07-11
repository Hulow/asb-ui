import { PictureMetadata } from '../../app/page';
import { CustomPicture } from '../Image/Picture';

export function ProjectOverview({
  pictureMetadata,
}: {
  pictureMetadata: PictureMetadata;
}) {
  return (
    <div className='flex-col-center'>
      <CustomPicture pictureMetadata={pictureMetadata} />
    </div>
  );
}
