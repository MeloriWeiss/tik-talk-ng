import { Community } from '../interfaces/communities.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { communitiesActions } from './actions';

export interface CommunitiesState {
  communities: Community[];
  communitiesFilters: Record<string, any>;
  page: number;
  size: number;
  totalCommunitiesCount: number;
}

const initialState: CommunitiesState = {
  communities: [],
  communitiesFilters: {},
  page: 1,
  size: 10,
  totalCommunitiesCount: 0,
};

export const communitiesFeature = createFeature({
  name: 'communitiesFeature',
  reducer: createReducer(
    initialState,
    on(communitiesActions.filterCommunities, (state, { filters }) => {
      return {
        ...state,
        communitiesFilters: filters,
        page: 1,
        communities: [],
      };
    }),
    on(
      communitiesActions.communitiesLoaded,
      (state, { communities, totalCommunitiesCount }) => {
        return {
          ...state,
          totalCommunitiesCount,
          communities: state.communities.concat(communities),
        };
      }
    ),
    on(communitiesActions.setPage, (state, { page }) => {
      return {
        ...state,
        page: page ?? state.page + 1,
      };
    }),
    on(communitiesActions.resetCommunities, (state, _) => {
      return {
        ...state,
        communities: [],
        page: 1,
      };
    }),
    on(communitiesActions.communityCreated, (state, { community }) => {
      return {
        ...state,
        communities: [community, ...state.communities],
      }
    })
  ),
});
