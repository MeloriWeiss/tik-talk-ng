import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Community } from '../interfaces/communities.interface';
import { Post, PostCreateDto } from '../../posts/index';
import { Profile } from '../../profile/index';

export const communitiesActions = createActionGroup({
  source: 'communities',
  events: {
    'filter communities': props<{ filters: Record<string, any> }>(),
    'communities loaded': props<{
      communities: Community[];
      totalCommunitiesCount: number;
    }>(),
    'set page': props<{ page?: number }>(),

    'reset communities': emptyProps(),

    'create community': props<{ params: Record<string, any> }>(),
    'community created': props<{ community: Community }>(),

    'fetch posts': props<{ communityId: number }>(),
    'posts loaded': props<{ posts: Post<Community>[] }>(),

    'create post': props<{ community: Community; payload: PostCreateDto }>(),
    'fetch post': props<{ postId: number }>(),
    'post loaded': props<{ post: Post<Community> }>(),
  },
});
