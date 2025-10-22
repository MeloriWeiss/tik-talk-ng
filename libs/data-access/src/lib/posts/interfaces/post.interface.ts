import { Profile } from '../../profile/index';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId?: number;
  communityId?: number;
}

export interface Post<T> {
  id: number;
  title: string;
  communityId: number | null;
  content: string;
  author: T;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: PostComment[];
}

export interface BasePostAuthor {
  id: number,
  admin: Profile,
  name: string,
  avatarUrl: string | null,
}

export interface PostComment {
  id: number;
  text: string;
  author: Author;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: number;
  username: string;
  avatarUrl: string;
  subscribersAmount: number;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
  commentId?: number;
}
