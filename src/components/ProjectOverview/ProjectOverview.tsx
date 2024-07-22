import { PictureMetadata } from '../../handlers/cloudinary';
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
