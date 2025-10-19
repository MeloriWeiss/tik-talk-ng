import { Profile } from '../../profile/index';

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
}
