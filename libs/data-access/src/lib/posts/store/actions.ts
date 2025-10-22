import { createActionGroup, props } from '@ngrx/store';
import { Post, PostComment } from '../index';
import { CommentCreateDto, PostCreateDto } from '../interfaces/post.interface';
import { Profile } from '../../profile';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'fetch posts': props<{ userId?: number }>(),
    'posts loaded': props<{ posts: Post<Profile>[] }>(),
    'fetch post': props<{ postId: number }>(),
    'post loaded': props<{ post: Post<Profile> }>(),
    'create post': props<{ payload: PostCreateDto }>(),

    'create comment': props<{ payload: CommentCreateDto }>(),
    'comment created': props<{ comment: PostComment }>(),
    'comments loaded': props<{ comments: PostComment[] }>(),
  },
});
