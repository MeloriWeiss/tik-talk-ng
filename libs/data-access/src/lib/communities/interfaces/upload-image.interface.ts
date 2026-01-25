import { CommunityImageType } from '../consts';

export interface UploadImageDto {
  community_id: number;
  image_type: CommunityImageType;
  image_file: File;
}
