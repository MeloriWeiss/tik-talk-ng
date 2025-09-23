import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Community } from '../interfaces/communities.interface';

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
  },
});
