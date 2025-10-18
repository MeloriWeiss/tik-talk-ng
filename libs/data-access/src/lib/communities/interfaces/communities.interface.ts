export interface Community {
  id: number;
  admin: Admin;
  name: string;
  themes: string[];
  tags: string[];
  bannerUrl: string;
  avatarUrl: string;
  description: string;
  subscribersAmount: number;
  createdAt: string;
  isJoined: boolean;
}

interface Admin {
  id: number;
  username: string;
  avatarUrl: string;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}
