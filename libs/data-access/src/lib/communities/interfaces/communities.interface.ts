import { Profile } from '../../profile/index';
import { Post } from '../../posts/index';
import { Nullable } from '../../shared/index';

export interface Community {
  id: number;
  admin: Profile;
  name: string;
  themes: string[];
  tags: string[];
  bannerUrl: string | null;
  avatarUrl: string;
  description: string;
  subscribersAmount: number;
  createdAt: string;
  isJoined: boolean;
  posts: Post<Community>[];
}

export interface CreateCommunityFormData {
  name: string;
  themes: string[];
  tags: string[];
  description: string;
}

export type OptionalCreateCommunityFormData = Partial<Nullable<CreateCommunityFormData>>;
